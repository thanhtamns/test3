#!/usr/bin/env node
/**
 * Tests for context-builder.cjs - rules/workflows backward compatibility
 * Run: node --test .claude/hooks/lib/__tests__/context-builder.test.cjs
 *
 * Preserve backward compatibility while migrating workflows/ to rules/.
 * Key scenarios:
 * - resolveRulesPath() checks rules/ first
 * - Falls back to workflows/ if rules/ not found
 * - resolveWorkflowPath alias works
 * - Both directories: rules/ wins
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Import the module under test
const contextBuilder = require('../context-builder.cjs');

/**
 * Create a temporary directory with optional subdirectories
 */
function createTempDir(subdirs = []) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'context-builder-test-'));

  for (const subdir of subdirs) {
    fs.mkdirSync(path.join(tempDir, subdir), { recursive: true });
  }

  return tempDir;
}

/**
 * Clean up temporary directory
 */
function cleanupTempDir(dir) {
  if (dir && fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Create a test file in the specified directory
 */
function createTestFile(dir, filename, content = '# Test file\n') {
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, content);
  return filePath;
}

describe('context-builder.cjs', () => {

  describe('resolveRulesPath()', () => {
    let originalCwd;
    let tempDir;

    before(() => {
      originalCwd = process.cwd();
    });

    after(() => {
      process.chdir(originalCwd);
      if (tempDir) cleanupTempDir(tempDir);
    });

    it('returns null when file does not exist anywhere', () => {
      tempDir = createTempDir(['.claude']);
      process.chdir(tempDir);

      // Use a unique filename that won't exist in global ~/.claude/
      const uniqueFilename = `nonexistent-${Date.now()}-${Math.random().toString(36).slice(2)}.md`;
      const result = contextBuilder.resolveRulesPath(uniqueFilename);
      assert.strictEqual(result, null, 'Should return null when file does not exist');
    });

    it('finds file in rules/ directory (new location)', () => {
      tempDir = createTempDir(['.claude/rules']);
      createTestFile(path.join(tempDir, '.claude/rules'), 'development-rules.md');
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath('development-rules.md');
      assert.strictEqual(result, '.claude/rules/development-rules.md',
        'Should find file in rules/ directory');
    });

    it('falls back to workflows/ when rules/ does not exist', () => {
      tempDir = createTempDir(['.claude/workflows']);
      const uniqueFilename = `legacy-workflow-${Date.now()}-${Math.random().toString(36).slice(2)}.md`;
      createTestFile(path.join(tempDir, '.claude/workflows'), uniqueFilename);
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath(uniqueFilename);
      assert.strictEqual(result, `.claude/workflows/${uniqueFilename}`,
        'Should fall back to workflows/ directory');
    });

    it('prefers rules/ over workflows/ when both exist', () => {
      tempDir = createTempDir(['.claude/rules', '.claude/workflows']);
      createTestFile(path.join(tempDir, '.claude/rules'), 'development-rules.md', '# Rules version\n');
      createTestFile(path.join(tempDir, '.claude/workflows'), 'development-rules.md', '# Workflows version\n');
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath('development-rules.md');
      assert.strictEqual(result, '.claude/rules/development-rules.md',
        'Should prefer rules/ over workflows/');
    });

    it('finds file in workflows/ when rules/ exists but file is only in workflows/', () => {
      tempDir = createTempDir(['.claude/rules', '.claude/workflows']);
      // rules/ exists but file is only in workflows/
      createTestFile(path.join(tempDir, '.claude/workflows'), 'legacy-file.md');
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath('legacy-file.md');
      assert.strictEqual(result, '.claude/workflows/legacy-file.md',
        'Should find file in workflows/ when not in rules/');
    });

    it('handles custom configDirName parameter', () => {
      tempDir = createTempDir(['.opencode/rules']);
      createTestFile(path.join(tempDir, '.opencode/rules'), 'development-rules.md');
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath('development-rules.md', '.opencode');
      assert.strictEqual(result, '.opencode/rules/development-rules.md',
        'Should use custom configDirName');
    });

  });

  describe('resolveWorkflowPath alias', () => {

    it('resolveWorkflowPath is exported and callable', () => {
      assert.ok(typeof contextBuilder.resolveWorkflowPath === 'function',
        'resolveWorkflowPath should be exported');
    });

    it('resolveWorkflowPath is alias for resolveRulesPath', () => {
      assert.strictEqual(contextBuilder.resolveWorkflowPath, contextBuilder.resolveRulesPath,
        'resolveWorkflowPath should be same function as resolveRulesPath');
    });

    it('resolveWorkflowPath works identically to resolveRulesPath', () => {
      const tempDir = createTempDir(['.claude/rules']);
      createTestFile(path.join(tempDir, '.claude/rules'), 'test.md');
      const originalCwd = process.cwd();
      process.chdir(tempDir);

      try {
        const rulesResult = contextBuilder.resolveRulesPath('test.md');
        const workflowResult = contextBuilder.resolveWorkflowPath('test.md');
        assert.strictEqual(rulesResult, workflowResult,
          'Both functions should return same result');
      } finally {
        process.chdir(originalCwd);
        cleanupTempDir(tempDir);
      }
    });

  });

  describe('Global path resolution', () => {
    it('checks global ~/.claude/rules/ path', () => {
      const testRoot = createTempDir();
      const projectDir = path.join(testRoot, 'project');
      const syntheticHome = path.join(testRoot, 'home');
      const globalRulesDir = path.join(syntheticHome, '.claude', 'rules');
      const originalCwd = process.cwd();
      const originalHomedir = os.homedir;
      fs.mkdirSync(projectDir, { recursive: true });
      fs.mkdirSync(globalRulesDir, { recursive: true });
      createTestFile(globalRulesDir, 'global-rule.md');
      os.homedir = () => syntheticHome;
      process.chdir(projectDir);

      try {
        assert.strictEqual(
          contextBuilder.resolveRulesPath('global-rule.md'),
          '~/.claude/rules/global-rule.md'
        );
      } finally {
        process.chdir(originalCwd);
        os.homedir = originalHomedir;
        cleanupTempDir(testRoot);
      }
    });

  });

  describe('buildReminderContext()', () => {
    let tempDir;
    let originalCwd;

    before(() => {
      originalCwd = process.cwd();
    });

    after(() => {
      process.chdir(originalCwd);
      if (tempDir) cleanupTempDir(tempDir);
    });

    it('returns content, lines, and sections', () => {
      tempDir = createTempDir(['.claude/rules']);
      createTestFile(path.join(tempDir, '.claude/rules'), 'development-rules.md');
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.ok(result.content, 'Should have content');
      assert.ok(Array.isArray(result.lines), 'Should have lines array');
      assert.ok(result.sections, 'Should have sections object');
    });

    it('includes devRulesPath when rules/ exists', () => {
      tempDir = createTempDir(['.claude/rules']);
      createTestFile(path.join(tempDir, '.claude/rules'), 'development-rules.md');
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.ok(result.content.includes('rules/development-rules.md') ||
                result.content.includes('development-rules'),
        'Should reference dev rules file');
    });

    it('includes devRulesPath when only workflows/ exists (backward compat)', () => {
      tempDir = createTempDir(['.claude/workflows']);
      createTestFile(path.join(tempDir, '.claude/workflows'), 'development-rules.md');
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.ok(result.content.includes('workflows/development-rules.md') ||
                result.content.includes('development-rules'),
        'Should reference dev rules file from workflows/');
    });

  });

  describe('Section builders', () => {

    it('buildSessionSection returns array of lines', () => {
      const lines = contextBuilder.buildSessionSection({});
      assert.ok(Array.isArray(lines), 'Should return array');
      assert.ok(lines.some(l => l.includes('Session')), 'Should include Session header');
    });

    it('buildRulesSection returns array with Rules header', () => {
      const lines = contextBuilder.buildRulesSection({});
      assert.ok(Array.isArray(lines), 'Should return array');
      assert.ok(lines.some(l => l.includes('Rules')), 'Should include Rules header');
    });

    it('buildRulesSection uses absolute paths when provided', () => {
      const lines = contextBuilder.buildRulesSection({
        plansPath: '/Users/test/project/plans',
        docsPath: '/Users/test/project/docs'
      });
      const joined = lines.join('\n');
      assert.ok(joined.includes('/Users/test/project/plans'), 'Should include absolute plans path');
      assert.ok(joined.includes('/Users/test/project/docs'), 'Should include absolute docs path');
      assert.ok(!joined.includes('Plans → "plans/"'), 'Should NOT use bare relative "plans/" when absolute path provided');
    });

    it('buildRulesSection falls back to relative paths when none are provided', () => {
      const lines = contextBuilder.buildRulesSection({});
      const joined = lines.join('\n');
      assert.ok(joined.includes('"plans"'), 'Should fall back to relative plans');
      assert.ok(joined.includes('"docs"'), 'Should fall back to relative docs');
    });

    it('buildModularizationSection returns array with Modularization', () => {
      const lines = contextBuilder.buildModularizationSection();
      assert.ok(Array.isArray(lines), 'Should return array');
      assert.ok(lines.some(l => l.includes('Modularization')), 'Should include Modularization');
    });

    it('buildPathsSection includes paths', () => {
      const lines = contextBuilder.buildPathsSection({
        reportsPath: '/test/reports/',
        plansPath: '/test/plans',
        docsPath: '/test/docs'
      });
      assert.ok(Array.isArray(lines), 'Should return array');
      assert.ok(lines.some(l => l.includes('Reports')), 'Should include Reports');
      assert.ok(lines.some(l => l.includes('Plans')), 'Should include Plans');
    });

    it('buildNamingSection includes naming patterns', () => {
      const lines = contextBuilder.buildNamingSection({
        reportsPath: '/reports/',
        plansPath: '/plans',
        namePattern: '{date}-{slug}'
      });
      assert.ok(Array.isArray(lines), 'Should return array');
      assert.ok(lines.some(l => l.includes('Naming')), 'Should include Naming');
    });

  });

  describe('Session-scoped dedup markers', () => {
    const sessionTestRoot = createTempDir();
    const sessionId = path.basename(sessionTestRoot);
    const sessionStatePath = path.join(os.tmpdir(), `ck-session-${sessionId}.json`);

    after(() => {
      fs.rmSync(sessionStatePath, { force: true });
      cleanupTempDir(sessionTestRoot);
    });

    it('marks and detects recent injections without a transcript path', () => {
      fs.rmSync(sessionStatePath, { force: true });

      assert.strictEqual(contextBuilder.wasRecentlyInjected(null, sessionId), false,
        'Session should start without a recent injection marker');
      assert.strictEqual(contextBuilder.markRecentlyInjected(sessionId), true,
        'Should persist a session-scoped dedup marker');
      assert.strictEqual(contextBuilder.wasRecentlyInjected(null, sessionId), true,
        'Session marker should dedupe repeated injections even without transcript access');
    });

    it('ignores expired session markers', () => {
      fs.writeFileSync(sessionStatePath, JSON.stringify({
        devRulesReminder: {
          scopes: {
            session: {
              lastInjectedAt: new Date(Date.now() - (6 * 60 * 1000)).toISOString()
            }
          }
        }
      }));

      assert.strictEqual(contextBuilder.wasRecentlyInjected(null, sessionId), false,
        'Expired markers should allow reminder reinjection');
    });

    it('fails open when the session marker is corrupt', () => {
      fs.writeFileSync(sessionStatePath, '{not-json');

      assert.strictEqual(contextBuilder.wasRecentlyInjected(null, sessionId), false,
        'Corrupt session state should not suppress reminders');
    });

    it('tracks pending reservations per scope', () => {
      fs.rmSync(sessionStatePath, { force: true });

      assert.deepStrictEqual(
        contextBuilder.reserveInjectionScope(sessionId, 'scope-a', null),
        { shouldInject: true, reserved: true }
      );
      assert.deepStrictEqual(
        contextBuilder.reserveInjectionScope(sessionId, 'scope-a', null),
        { shouldInject: false, reserved: false }
      );
      assert.deepStrictEqual(
        contextBuilder.reserveInjectionScope(sessionId, 'scope-b', null),
        { shouldInject: true, reserved: true }
      );
      assert.strictEqual(contextBuilder.clearPendingInjection(sessionId, 'scope-a'), true,
        'Should clear the pending reservation for the matched scope');
    });

    it('falls back to transcript evidence for the same cwd after marker expiry', () => {
      const tempDir = createTempDir();
      const transcriptPath = path.join(tempDir, 'transcript.txt');
      const scopeKey = contextBuilder.buildInjectionScopeKey({ baseDir: tempDir });

      try {
        const lines = Array(200).fill('x');
        lines[170] = `- CWD: ${scopeKey}`;
        lines[180] = '[IMPORTANT] Consider Modularization';
        fs.writeFileSync(transcriptPath, lines.join('\n'));
        fs.writeFileSync(sessionStatePath, JSON.stringify({
          devRulesReminder: {
            scopes: {
              [scopeKey]: {
                lastInjectedAt: new Date(Date.now() - (6 * 60 * 1000)).toISOString()
              }
            }
          }
        }));

        assert.strictEqual(contextBuilder.wasRecentlyInjected(transcriptPath, sessionId, scopeKey), true,
          'Transcript fallback should still dedupe the same cwd after marker expiry');
        assert.deepStrictEqual(
          contextBuilder.reserveInjectionScope(sessionId, scopeKey, transcriptPath),
          { shouldInject: false, reserved: false }
        );
      } finally {
        cleanupTempDir(tempDir);
      }
    });
  });

  describe('usage cache override', () => {
    it('reads the same CK_USAGE_CACHE_PATH override used by the cache writer', () => {
      const testRoot = createTempDir();
      const cachePath = path.join(testRoot, 'usage-cache.json');
      const originalOverride = process.env.CK_USAGE_CACHE_PATH;
      const data = {
        five_hour: { utilization: 42 },
        seven_day: { utilization: 17 }
      };

      try {
        fs.writeFileSync(cachePath, JSON.stringify({ timestamp: Date.now(), data }));
        process.env.CK_USAGE_CACHE_PATH = cachePath;

        assert.strictEqual(contextBuilder.getUsageCachePath(), cachePath);
        assert.deepStrictEqual(contextBuilder.readUsageCache(), data);
      } finally {
        if (originalOverride === undefined) {
          delete process.env.CK_USAGE_CACHE_PATH;
        } else {
          process.env.CK_USAGE_CACHE_PATH = originalOverride;
        }
        cleanupTempDir(testRoot);
      }
    });
  });

  describe('hooks config behavior', () => {
    let tempDir;
    let originalCwd;

    before(() => {
      originalCwd = process.cwd();
    });

    after(() => {
      process.chdir(originalCwd);
      if (tempDir) cleanupTempDir(tempDir);
    });

    it('disables context section when context-tracking: false', () => {
      tempDir = createTempDir(['.claude']);
      const settingsPath = path.join(tempDir, '.claude', 'settings.json');
      fs.writeFileSync(settingsPath, JSON.stringify({
        hooks: {
          'context-tracking': false
        }
      }));
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.ok(Array.isArray(result.sections.context), 'context should be array');
      assert.strictEqual(result.sections.context.length, 0, 'context section should be empty');
    });

    it('disables usage section when usage-context-awareness: false', () => {
      tempDir = createTempDir(['.claude']);
      const settingsPath = path.join(tempDir, '.claude', 'settings.json');
      fs.writeFileSync(settingsPath, JSON.stringify({
        hooks: {
          'usage-context-awareness': false
        }
      }));
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.ok(Array.isArray(result.sections.usage), 'usage should be array');
      assert.strictEqual(result.sections.usage.length, 0, 'usage section should be empty');
    });

    it('disables both sections when both hooks false', () => {
      tempDir = createTempDir(['.claude']);
      const settingsPath = path.join(tempDir, '.claude', 'settings.json');
      fs.writeFileSync(settingsPath, JSON.stringify({
        hooks: {
          'context-tracking': false,
          'usage-context-awareness': false
        }
      }));
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.strictEqual(result.sections.context.length, 0, 'context section should be empty');
      assert.strictEqual(result.sections.usage.length, 0, 'usage section should be empty');
    });

    it('enables sections by default when hooks undefined', () => {
      tempDir = createTempDir(['.claude']);
      const settingsPath = path.join(tempDir, '.claude', 'settings.json');
      fs.writeFileSync(settingsPath, JSON.stringify({}));
      process.chdir(tempDir);

      const result = contextBuilder.buildReminderContext({});

      assert.ok(Array.isArray(result.sections.context), 'context should be array');
      assert.ok(Array.isArray(result.sections.usage), 'usage should be array');
      // Enabled sections may be empty or populated - just verify they exist
    });

  });

  describe('rule reference resolution', () => {
    let tempDir;
    let originalCwd;

    before(() => {
      originalCwd = process.cwd();
    });

    after(() => {
      process.chdir(originalCwd);
      if (tempDir) cleanupTempDir(tempDir);
    });

    it('resolves a rule from the active runtime directory', () => {
      tempDir = createTempDir(['.claude/rules']);
      const ruleName = 'synthetic-policy.md';
      createTestFile(path.join(tempDir, '.claude/rules'), ruleName);
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath(ruleName);
      assert.ok(result !== null, `Should resolve ${ruleName}`);
      assert.ok(result.includes('rules/'), `${ruleName} should be in rules/`);
    });

    it('resolves legacy @workflows/ references via fallback', () => {
      // Test that legacy references still work
      tempDir = createTempDir(['.claude/workflows']);
      const uniqueFilename = `legacy-primary-${Date.now()}-${Math.random().toString(36).slice(2)}.md`;
      createTestFile(path.join(tempDir, '.claude/workflows'), uniqueFilename);
      process.chdir(tempDir);

      const result = contextBuilder.resolveRulesPath(uniqueFilename);
      assert.ok(result !== null, 'Should resolve legacy workflow file');
      assert.ok(result.includes('workflows/'), 'Should find in workflows/');
    });

  });

});
