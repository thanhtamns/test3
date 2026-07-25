/**
 * Tests for ck-config-utils edge case handling
 * Run: node .claude/hooks/lib/__tests__/ck-config-utils.test.cjs
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');
const {
  normalizePath,
  toDisplayPath,
  isAbsolutePath,
  sanitizePath,
  sanitizeSlug,
  sanitizeConfig,
  validateNamingPattern,
  getGitRoot,
  getGitBranch,
  getReportsPath,
  escapeShellValue,
  resolvePlanPath,
  writeSessionState,
  readSessionState,
  normalizeSessionId,
  getSessionTempPath,
  getContextTempPath
} = require('../ck-config-utils.cjs');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${e.message}`);
    failed++;
  }
}

function assertEquals(actual, expected, msg = '') {
  if (actual !== expected) {
    throw new Error(`${msg}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
  }
}

function assertSameFilesystemPath(actual, expected, msg = '') {
  assertEquals(
    fs.realpathSync.native(actual),
    fs.realpathSync.native(expected),
    msg || 'Paths should resolve to the same filesystem location'
  );
}

function makeTempDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `${prefix}-`));
}

console.log('\n=== normalizePath tests ===\n');

test('trailing slashes: "plans///" → "plans"', () => {
  assertEquals(normalizePath('plans///'), 'plans');
});

test('trailing slashes: "my-plans///" → "my-plans"', () => {
  assertEquals(normalizePath('my-plans///'), 'my-plans');
});

test('empty paths: "   " → null', () => {
  assertEquals(normalizePath('   '), null);
});

test('empty string → null', () => {
  assertEquals(normalizePath(''), null);
});

test('null → null', () => {
  assertEquals(normalizePath(null), null);
});

test('undefined → null', () => {
  assertEquals(normalizePath(undefined), null);
});

test('whitespace around path trimmed', () => {
  assertEquals(normalizePath('  plans  '), 'plans');
});

console.log('\n=== isAbsolutePath tests ===\n');

test('absolute path: "/tmp/all-plans" → true', () => {
  assertEquals(isAbsolutePath('/tmp/all-plans'), true);
});

test('relative path: "plans" → false', () => {
  assertEquals(isAbsolutePath('plans'), false);
});

test('relative path: "./plans" → false', () => {
  assertEquals(isAbsolutePath('./plans'), false);
});

test('Windows absolute: "C:\\Users" → true (Linux: false)', () => {
  // On Linux, Windows paths aren't recognized as absolute - expected behavior
  const expected = process.platform === 'win32';
  assertEquals(isAbsolutePath('C:\\Users'), expected);
});

test('empty → false', () => {
  assertEquals(isAbsolutePath(''), false);
});

console.log('\n=== sanitizePath tests ===\n');

// sanitizePath resolves against projectRoot with the platform's own path rules,
// so the fixture root must be a path the platform would actually produce —
// projectRoot is always process.cwd() in production. A POSIX root on Windows
// resolves to a different drive-relative path and blocks everything.
const isWindows = process.platform === 'win32';
const projectRoot = isWindows ? 'C:\\Users\\user\\project' : '/home/user/project';
const absoluteOutsidePath = isWindows ? 'D:\\all-plans' : '/tmp/all-plans';

test('path traversal: "../../../tmp" → null (blocked)', () => {
  assertEquals(sanitizePath('../../../tmp', projectRoot), null);
});

test('absolute path respected', () => {
  const result = sanitizePath(absoluteOutsidePath, projectRoot);
  assertEquals(result, absoluteOutsidePath);
});

test('relative path within project returns normalized relative', () => {
  // sanitizePath returns normalized path, not joined (joining done by caller)
  const result = sanitizePath('plans', projectRoot);
  assertEquals(result, 'plans');
});

test('nested relative path within project accepted', () => {
  assertEquals(sanitizePath('docs/plans', projectRoot), 'docs/plans');
});

test('null byte injection blocked', () => {
  assertEquals(sanitizePath('plans\x00evil', projectRoot), null);
});

// A project sitting at a drive or filesystem root: "root + separator" is a
// doubled separator that no resolved path starts with, so the old containment
// check blocked every relative config path and silently fell back to defaults.
test('project at filesystem root still accepts a relative path', () => {
  const rootProject = isWindows ? 'C:\\' : '/';
  assertEquals(sanitizePath('plans', rootProject), 'plans');
});

// Not a hole: at the root there is nothing above to escape to. ".." clamps at
// the root, so the path resolves back inside the project and is accepted. The
// test pins that reasoning, so a future containment change has to face it.
test('project at filesystem root accepts traversal that cannot escape', () => {
  const rootProject = isWindows ? 'C:\\' : '/';
  assertEquals(sanitizePath('../../evil', rootProject), '../../evil');
  assertEquals(path.resolve(rootProject, '../../evil'), path.join(rootProject, 'evil'));
});

if (isWindows) {
  test('windows: backslash traversal blocked', () => {
    assertEquals(sanitizePath('..\\..\\evil', projectRoot), null);
  });

  test('windows: forward-slash relative path accepted', () => {
    assertEquals(sanitizePath('plans/sub', projectRoot), 'plans/sub');
  });

  test('windows: sibling directory sharing a name prefix is blocked', () => {
    // "C:\Users\user\project-evil" starts with "C:\Users\user\project" as a
    // string, so a prefix test without a separator boundary would allow it.
    assertEquals(sanitizePath('..\\project-evil', projectRoot), null);
  });
}

console.log('\n=== session temp path tests ===\n');

test('session IDs are trimmed before creating temp paths', () => {
  assertEquals(normalizeSessionId('  session-123  '), 'session-123');
  assertEquals(getSessionTempPath('  session-123  '), getSessionTempPath('session-123'));
});

test('session temp paths reject Unix and Windows traversal', () => {
  assertEquals(getSessionTempPath('../outside'), null);
  assertEquals(getSessionTempPath('..\\outside'), null);
  assertEquals(getContextTempPath('../../outside'), null);
  assertEquals(getContextTempPath('..\\..\\outside'), null);
});

test('session state writes fail closed for traversal IDs', () => {
  assertEquals(writeSessionState('../outside', { unsafe: true }), false);
  assertEquals(readSessionState('../outside'), null);
});

console.log('\n=== sanitizeSlug tests ===\n');

test('invalid filename chars removed: <, >, :, ", etc.', () => {
  const result = sanitizeSlug('test<>:"/\\|?*slug');
  assertEquals(result, 'testslug');
});

test('control chars removed', () => {
  const result = sanitizeSlug('test\x00\x1fslug');
  assertEquals(result, 'testslug');
});

test('length limited to 100 chars', () => {
  const longSlug = 'a'.repeat(150);
  const result = sanitizeSlug(longSlug);
  assertEquals(result.length, 100);
});

test('empty slug returns empty (caller handles fallback)', () => {
  // sanitizeSlug returns empty, caller decides fallback
  const result = sanitizeSlug('');
  assertEquals(result, '');
});

console.log('\n=== validateNamingPattern tests ===\n');

test('valid pattern with {slug}', () => {
  const result = validateNamingPattern('251217-{slug}');
  assertEquals(result.valid, true);
});

test('pattern without {slug} → invalid', () => {
  const result = validateNamingPattern('251217-feature');
  assertEquals(result.valid, false);
  assertEquals(result.error, 'Pattern must contain {slug} placeholder');
});

test('empty pattern → invalid', () => {
  const result = validateNamingPattern('');
  assertEquals(result.valid, false);
});

test('unresolved placeholder → invalid', () => {
  const result = validateNamingPattern('{date}-{slug}');
  assertEquals(result.valid, false);
});

console.log('\n=== getGitRoot tests ===\n');

test('getGitRoot returns path when in git repo', () => {
  const result = getGitRoot();
  // We're running from within a git repo, so should return a path
  if (result === null) {
    throw new Error('Expected git root path but got null');
  }
  if (!path.isAbsolute(result)) {
    throw new Error(`Expected absolute path but got: ${result}`);
  }
});

console.log('\n=== getReportsPath with baseDir tests ===\n');

// baseDir is process.cwd() in production, so it carries the platform's own form.
const reportsBaseDir = projectRoot;

// The expected value is stated as path.join of the semantic segments, rendered
// forward-slash. That is an independent oracle, not a mirror of the code: the
// function builds its path by template concatenation and joins once, so a
// dropped segment, a double-join (#335), or a lost separator all diverge from
// this while a deliberate re-spelling of the same intent does not.
function expectedDisplayPath(...segments) {
  return toDisplayPath(path.join(...segments));
}

test('getReportsPath returns absolute path when baseDir provided', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: 'plans' };

  const result = getReportsPath(null, null, planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'reports'));
});

test('getReportsPath returns relative path when no baseDir', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: 'plans' };

  const result = getReportsPath(null, null, planConfig, pathsConfig);
  assertEquals(result, 'plans/reports/');
});

test('getReportsPath uses plan path for session-resolved plans', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: 'plans' };

  const result = getReportsPath('plans/my-plan', 'session', planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'my-plan', 'reports'));
});

test('getReportsPath ignores plan path for branch-resolved plans', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: 'plans' };

  const result = getReportsPath('plans/my-plan', 'branch', planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'reports'));
});

// The contract these hooks owe their consumers: every emitted path is text the
// model reads and hands back to a shell. A backslash survives none of that.
test('getReportsPath emits no backslash on any platform', () => {
  const result = getReportsPath(null, null, { reportsDir: 'reports' }, { plans: 'plans' }, reportsBaseDir);
  if (result.includes('\\')) {
    throw new Error(`reports path is shell-hostile: ${JSON.stringify(result)}`);
  }
});

// The only assertion here that survives a change of path-form contract: whatever
// we emit, the OS must accept it back.
test('getReportsPath emits a path the OS can actually create', () => {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'ck-reports-'));
  try {
    const result = getReportsPath(null, null, { reportsDir: 'reports' }, { plans: 'plans' }, base);
    fs.mkdirSync(result, { recursive: true });
    if (!fs.existsSync(result)) {
      throw new Error(`emitted path did not round-trip through the filesystem: ${result}`);
    }
  } finally {
    fs.rmSync(base, { recursive: true, force: true });
  }
});

console.log('\n=== getGitRoot/getGitBranch with cwd parameter ===\n');

test('getGitRoot accepts cwd parameter', () => {
  const gitRoot = getGitRoot();
  if (!gitRoot) {
    console.log('  → Skipped: not in git repo');
    return;
  }
  // Should work with explicit cwd
  const result = getGitRoot(gitRoot);
  assertSameFilesystemPath(result, gitRoot);
});

test('getGitRoot with subdirectory cwd returns same root', () => {
  const gitRoot = getGitRoot();
  if (!gitRoot) {
    console.log('  → Skipped: not in git repo');
    return;
  }
  // Run from .claude/hooks subdirectory
  const subdirPath = path.join(gitRoot, '.claude', 'hooks');
  if (!fs.existsSync(subdirPath)) {
    console.log('  → Skipped: subdirectory does not exist');
    return;
  }
  const result = getGitRoot(subdirPath);
  assertSameFilesystemPath(result, gitRoot);
});

test('getGitRoot returns null for non-git directory', () => {
  const tempDir = makeTempDir('ck-test-no-git');
  try {
    const result = getGitRoot(tempDir);
    assertEquals(result, null);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('getGitBranch accepts cwd parameter', () => {
  const gitRoot = getGitRoot();
  if (!gitRoot) {
    console.log('  → Skipped: not in git repo');
    return;
  }
  const branch1 = getGitBranch();
  const branch2 = getGitBranch(gitRoot);
  assertEquals(branch1, branch2);
});

console.log('\n=== escapeShellValue tests (Security) ===\n');

test('escapeShellValue escapes backslashes', () => {
  const result = escapeShellValue('path\\with\\backslash');
  assertEquals(result, 'path\\\\with\\\\backslash');
});

test('escapeShellValue escapes double quotes', () => {
  const result = escapeShellValue('path"with"quotes');
  assertEquals(result, 'path\\"with\\"quotes');
});

test('escapeShellValue escapes dollar signs', () => {
  const result = escapeShellValue('path$with$dollar');
  assertEquals(result, 'path\\$with\\$dollar');
});

test('escapeShellValue escapes backticks', () => {
  const result = escapeShellValue('path`with`backticks');
  assertEquals(result, 'path\\`with\\`backticks');
});

test('escapeShellValue handles mixed special chars', () => {
  const result = escapeShellValue('test\\$`"mixed');
  assertEquals(result, 'test\\\\\\$\\`\\"mixed');
});

test('escapeShellValue returns non-string as-is', () => {
  assertEquals(escapeShellValue(123), 123);
  assertEquals(escapeShellValue(null), null);
  assertEquals(escapeShellValue(undefined), undefined);
});

test('getReportsPath does not double-join an absolute planPath', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: 'plans' };
  // Session state may already contain an absolute plan path.
  const absolutePlanPath = path.join(reportsBaseDir, 'plans', 'my-plan');

  const result = getReportsPath(absolutePlanPath, 'session', planConfig, pathsConfig, reportsBaseDir);
  // Should NOT repeat reportsBaseDir inside the result
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'my-plan', 'reports'));
});

console.log('\n=== getReportsPath edge cases ===\n');

test('getReportsPath with empty reportsDir falls back to "reports"', () => {
  const planConfig = { reportsDir: '' };
  const pathsConfig = { plans: 'plans' };
  const result = getReportsPath(null, null, planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'reports'));
});

test('getReportsPath with null reportsDir falls back to "reports"', () => {
  const planConfig = { reportsDir: null };
  const pathsConfig = { plans: 'plans' };
  const result = getReportsPath(null, null, planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'reports'));
});

test('getReportsPath with empty plansDir falls back to "plans"', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: '' };
  const result = getReportsPath(null, null, planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'reports'));
});

test('getReportsPath with null plansDir falls back to "plans"', () => {
  const planConfig = { reportsDir: 'reports' };
  const pathsConfig = { plans: null };
  const result = getReportsPath(null, null, planConfig, pathsConfig, reportsBaseDir);
  assertEquals(result, expectedDisplayPath(reportsBaseDir, 'plans', 'reports'));
});

console.log('\n=== sanitizeConfig tests ===\n');

test('absolute path in config preserved through sanitization', () => {
  const config = {
    plan: { reportsDir: 'reports' },
    paths: { docs: 'docs', plans: '/tmp/all-plans' }
  };
  const result = sanitizeConfig(config, '/home/user/project');
  assertEquals(result.paths.plans, '/tmp/all-plans');
});

test('mixed absolute/relative paths preserved independently', () => {
  const config = {
    plan: { reportsDir: 'reports' },
    paths: { docs: 'docs', plans: '/tmp/all-plans' }
  };
  const result = sanitizeConfig(config, '/home/user/project');
  assertEquals(result.paths.docs, 'docs');
  assertEquals(result.paths.plans, '/tmp/all-plans');
});

console.log('\n=== isAbsolutePath edge cases ===\n');

test('UNC path on Windows: "\\\\\\\\server\\\\share" (platform-conditional)', () => {
  const expected = process.platform === 'win32';
  assertEquals(isAbsolutePath('\\\\server\\share'), expected);
});

test('path.join concatenates paths (does NOT discard baseDir)', () => {
  // Documents the Node behaviour getReportsPath's #335 guard exists for: joining
  // an already-absolute plan path onto baseDir buries it inside baseDir instead
  // of replacing it. Asserted as the invariant rather than the exact string,
  // because the string differs per platform (win32 keeps the foreign drive
  // letter as a path segment) while the invariant is what the guard relies on.
  const joined = path.join(projectRoot, absoluteOutsidePath);
  if (!joined.startsWith(projectRoot)) {
    throw new Error(`path.join discarded baseDir: ${joined}`);
  }
  assertEquals(path.resolve(projectRoot, absoluteOutsidePath), absoluteOutsidePath);
});

console.log('\n=== Detached HEAD state tests ===\n');

test('getGitBranch returns null or empty in detached HEAD state', () => {
  const tempDir = makeTempDir('ck-test-detached');
  try {
    // Initialize git repo and create a commit
    execSync('git init -q', { cwd: tempDir });
    execSync('git config user.email "test@test.com"', { cwd: tempDir });
    execSync('git config user.name "Test"', { cwd: tempDir });
    fs.writeFileSync(path.join(tempDir, 'file.txt'), 'test');
    execSync('git add .', { cwd: tempDir });
    execSync('git commit -q -m "initial"', { cwd: tempDir });

    // Get commit hash and checkout detached HEAD
    const commitHash = execSync('git rev-parse HEAD', { cwd: tempDir, encoding: 'utf8' }).trim();
    execSync(`git checkout -q ${commitHash}`, { cwd: tempDir });

    // getGitBranch returns empty string or null in detached HEAD
    // (git branch --show-current outputs empty line when detached)
    const result = getGitBranch(tempDir);
    assertEquals(result === null || result === '', true);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('getGitRoot works in detached HEAD state', () => {
  const tempDir = makeTempDir('ck-test-detached-root');
  try {
    execSync('git init -q', { cwd: tempDir });
    execSync('git config user.email "test@test.com"', { cwd: tempDir });
    execSync('git config user.name "Test"', { cwd: tempDir });
    fs.writeFileSync(path.join(tempDir, 'file.txt'), 'test');
    execSync('git add .', { cwd: tempDir });
    execSync('git commit -q -m "initial"', { cwd: tempDir });

    const commitHash = execSync('git rev-parse HEAD', { cwd: tempDir, encoding: 'utf8' }).trim();
    execSync(`git checkout -q ${commitHash}`, { cwd: tempDir });

    // getGitRoot should still work
    const result = getGitRoot(tempDir);
    assertSameFilesystemPath(result, tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

console.log('\n=== Bare repository tests ===\n');

test('getGitRoot returns null for bare repository (no working tree)', () => {
  const tempDir = makeTempDir('ck-test-bare');
  try {
    execSync('git init -q --bare', { cwd: tempDir });

    // git rev-parse --show-toplevel fails in bare repos (no working tree)
    // This is expected git behavior - bare repos have no working directory
    const result = getGitRoot(tempDir);
    assertEquals(result, null);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('getGitBranch returns null for bare repository (no HEAD ref)', () => {
  const tempDir = makeTempDir('ck-test-bare-branch');
  try {
    execSync('git init -q --bare', { cwd: tempDir });

    // Fresh bare repo has no commits, so branch may be null
    const result = getGitBranch(tempDir);
    // Bare repos with no commits return null (no HEAD target)
    // This is expected behavior
    assertEquals(result === null || result === 'main' || result === 'master', true);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

console.log('\n=== Nested git repos tests ===\n');

test('getGitRoot returns innermost repo for nested git repos', () => {
  const outerDir = makeTempDir('ck-test-nested-outer');
  const innerDir = path.join(outerDir, 'inner');
  fs.mkdirSync(innerDir, { recursive: true });
  try {
    // Create outer git repo
    execSync('git init -q', { cwd: outerDir });

    // Create inner git repo (nested)
    execSync('git init -q', { cwd: innerDir });

    // From inner dir, should return inner repo root
    const resultInner = getGitRoot(innerDir);
    assertSameFilesystemPath(resultInner, innerDir);

    // From outer dir, should return outer repo root
    const resultOuter = getGitRoot(outerDir);
    assertSameFilesystemPath(resultOuter, outerDir);
  } finally {
    fs.rmSync(outerDir, { recursive: true, force: true });
  }
});

test('getGitRoot from nested subdir returns correct root', () => {
  const outerDir = makeTempDir('ck-test-nested-sub');
  const innerDir = path.join(outerDir, 'inner');
  const deepDir = path.join(innerDir, 'deep', 'subdir');
  fs.mkdirSync(deepDir, { recursive: true });
  try {
    execSync('git init -q', { cwd: outerDir });
    execSync('git init -q', { cwd: innerDir });

    // From deep subdir inside inner repo
    const result = getGitRoot(deepDir);
    assertSameFilesystemPath(result, innerDir);
  } finally {
    fs.rmSync(outerDir, { recursive: true, force: true });
  }
});

console.log('\n=== Symlinked directory tests ===\n');

test('getGitRoot resolves through symlink to git repo', () => {
  const testRoot = makeTempDir('ck-test-symlink');
  const realDir = path.join(testRoot, 'real');
  const linkDir = path.join(testRoot, 'link');
  fs.mkdirSync(realDir, { recursive: true });
  try {
    // Create git repo in real dir
    execSync('git init -q', { cwd: realDir });

    // Create symlink
    fs.symlinkSync(realDir, linkDir);

    // getGitRoot from symlink should work
    const result = getGitRoot(linkDir);
    // Git resolves to real path
    if (result !== null) {
      // Result should be the real path (symlink resolved)
      assertSameFilesystemPath(result, realDir);
    }
  } finally {
    fs.rmSync(testRoot, { recursive: true, force: true });
  }
});

test('getGitRoot with symlinked subdirectory', () => {
  const testRoot = makeTempDir('ck-test-symlink-sub');
  const realDir = path.join(testRoot, 'real');
  const subDir = path.join(realDir, 'subdir');
  const linkToSub = path.join(testRoot, 'link');
  fs.mkdirSync(subDir, { recursive: true });
  try {
    execSync('git init -q', { cwd: realDir });

    // Create symlink to subdirectory
    fs.symlinkSync(subDir, linkToSub);

    // getGitRoot from symlinked subdir should find parent repo
    const result = getGitRoot(linkToSub);
    if (result !== null) {
      assertSameFilesystemPath(result, realDir);
    }
  } finally {
    fs.rmSync(testRoot, { recursive: true, force: true });
  }
});

console.log('\n=== Git worktree tests ===\n');

test('getGitRoot works with git worktree', () => {
  const testRoot = makeTempDir('ck-test-worktree');
  const mainDir = path.join(testRoot, 'main');
  const worktreeDir = path.join(testRoot, 'worktree');
  fs.mkdirSync(mainDir, { recursive: true });
  try {
    // Create main repo with a commit
    execSync('git init -q', { cwd: mainDir });
    execSync('git config user.email "test@test.com"', { cwd: mainDir });
    execSync('git config user.name "Test"', { cwd: mainDir });
    fs.writeFileSync(path.join(mainDir, 'file.txt'), 'test');
    execSync('git add .', { cwd: mainDir });
    execSync('git commit -q -m "initial"', { cwd: mainDir });

    // Create worktree
    execSync(`git worktree add -q "${worktreeDir}" -b worktree-branch`, { cwd: mainDir });

    // getGitRoot from worktree should return worktree path
    const result = getGitRoot(worktreeDir);
    assertSameFilesystemPath(result, worktreeDir);

    // Cleanup worktree
    execSync(`git worktree remove -f "${worktreeDir}"`, { cwd: mainDir });
  } finally {
    fs.rmSync(testRoot, { recursive: true, force: true });
  }
});

console.log('\n=== Unicode path tests ===\n');

test('getGitRoot works with unicode characters in path', () => {
  const tempDir = makeTempDir('ck-test-日本語-émoji-🔥');
  try {
    execSync('git init -q', { cwd: tempDir });

    const result = getGitRoot(tempDir);
    assertSameFilesystemPath(result, tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('getGitBranch works with unicode branch name', () => {
  const tempDir = makeTempDir('ck-test-unicode-branch');
  try {
    execSync('git init -q', { cwd: tempDir });
    execSync('git config user.email "test@test.com"', { cwd: tempDir });
    execSync('git config user.name "Test"', { cwd: tempDir });
    fs.writeFileSync(path.join(tempDir, 'file.txt'), 'test');
    execSync('git add .', { cwd: tempDir });
    execSync('git commit -q -m "initial"', { cwd: tempDir });

    // Create and checkout branch with unicode name
    execSync('git checkout -q -b feature/日本語-test', { cwd: tempDir });

    const result = getGitBranch(tempDir);
    assertEquals(result, 'feature/日本語-test');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

console.log('\n=== Special character path tests ===\n');

test('getGitRoot works with special shell characters in path', () => {
  // Test paths with characters that need escaping in shell
  const tempDir = makeTempDir("ck-test-special-$var-'quote'");
  try {
    execSync('git init -q', { cwd: tempDir });

    const result = getGitRoot(tempDir);
    assertSameFilesystemPath(result, tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

console.log('\n=== Empty/new git repo tests ===\n');

test('getGitRoot works on new repo with no commits', () => {
  const tempDir = makeTempDir('ck-test-empty-repo');
  try {
    execSync('git init -q', { cwd: tempDir });

    // No commits yet
    const result = getGitRoot(tempDir);
    assertSameFilesystemPath(result, tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('getGitBranch on new repo returns default branch', () => {
  const tempDir = makeTempDir('ck-test-new-repo-branch');
  try {
    execSync('git init -q --initial-branch=main', { cwd: tempDir });

    const result = getGitBranch(tempDir);
    assertEquals(result, 'main');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

console.log('\n=== resolvePlanPath with sessionOrigin tests ===\n');

// Helper to generate unique session IDs for isolation
function generateTestSessionId() {
  return `test-session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Cleanup helper
function cleanupSession(sessionId) {
  const tempPath = getSessionTempPath(sessionId);
  try { fs.unlinkSync(tempPath); } catch (e) {}
}

test('resolvePlanPath returns an absolute path as-is', () => {
  const sessionId = generateTestSessionId();
  try {
    // Store absolute path in session
    writeSessionState(sessionId, {
      sessionOrigin: '/project/subfolder',
      activePlan: '/project/subfolder/plans/260111-feature',
      timestamp: Date.now()
    });

    const config = { paths: { plans: 'plans' }, plan: { resolution: { order: ['session'] } } };
    const result = resolvePlanPath(sessionId, config);

    assertEquals(result.resolvedBy, 'session');
    assertEquals(result.path, '/project/subfolder/plans/260111-feature');
  } finally {
    cleanupSession(sessionId);
  }
});

test('resolvePlanPath resolves a relative path using sessionOrigin', () => {
  const sessionId = generateTestSessionId();
  try {
    // Store relative path (legacy behavior)
    writeSessionState(sessionId, {
      sessionOrigin: '/project/subfolder',
      activePlan: 'plans/260111-feature',  // Relative
      timestamp: Date.now()
    });

    const config = { paths: { plans: 'plans' }, plan: { resolution: { order: ['session'] } } };
    const result = resolvePlanPath(sessionId, config);

    assertEquals(result.resolvedBy, 'session');
    // Should resolve using sessionOrigin
    assertEquals(result.path, '/project/subfolder/plans/260111-feature');
  } finally {
    cleanupSession(sessionId);
  }
});

test('resolvePlanPath without sessionOrigin uses relative path as-is', () => {
  const sessionId = generateTestSessionId();
  try {
    // No sessionOrigin (edge case)
    writeSessionState(sessionId, {
      activePlan: 'plans/260111-feature',
      timestamp: Date.now()
    });

    const config = { paths: { plans: 'plans' }, plan: { resolution: { order: ['session'] } } };
    const result = resolvePlanPath(sessionId, config);

    assertEquals(result.resolvedBy, 'session');
    // Without sessionOrigin, returns as-is (relative)
    assertEquals(result.path, 'plans/260111-feature');
  } finally {
    cleanupSession(sessionId);
  }
});

test('resolvePlanPath renders a Windows session path in display form', () => {
  if (process.platform !== 'win32') {
    console.log('  → Skipped: Windows-only test');
    return;
  }
  const sessionId = generateTestSessionId();
  try {
    writeSessionState(sessionId, {
      sessionOrigin: 'C:\\Users\\test\\project',
      activePlan: 'C:\\Users\\test\\project\\plans\\feature',
      timestamp: Date.now()
    });

    const config = { paths: { plans: 'plans' }, plan: { resolution: { order: ['session'] } } };
    const result = resolvePlanPath(sessionId, config);

    assertEquals(result.resolvedBy, 'session');
    // Session state stores a native Windows path; what comes back is the same
    // path — drive and segments intact, nothing dropped or doubled — with the
    // separators rendered for the consumer, which is an injected prompt line
    // and the CK_ACTIVE_PLAN env value, never an fs call.
    //
    // This assertion used to require the backslashes back verbatim. That was
    // the old contract, and it is what a shell mangles the moment the model
    // pastes the path into a Bash tool call unquoted.
    assertEquals(result.path, 'C:/Users/test/project/plans/feature');
  } finally {
    cleanupSession(sessionId);
  }
});

test('resolvePlanPath falls back to branch if no session state', () => {
  const sessionId = generateTestSessionId();
  // Don't write any session state

  const config = { paths: { plans: 'plans' }, plan: { resolution: { order: ['session', 'branch'] } } };
  const result = resolvePlanPath(sessionId, config);

  // Should fall through to branch or return null
  assertEquals(result.resolvedBy === 'branch' || result.resolvedBy === null, true);
});

// Summary
console.log('\n=== Summary ===\n');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

if (failed > 0) {
  process.exit(1);
}
