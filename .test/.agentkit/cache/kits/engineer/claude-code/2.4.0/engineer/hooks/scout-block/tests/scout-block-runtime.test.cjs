const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { after, before, describe, it } = require('node:test');

const sourceHooksRoot = path.join(__dirname, '..', '..');

let fixtureRoot;
let hookPath;
let projectRoot;

before(() => {
  fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agentkit-scout-block-'));
  const installedConfigRoot = path.join(fixtureRoot, '.claude');
  projectRoot = path.join(fixtureRoot, 'project');
  fs.mkdirSync(projectRoot, { recursive: true });
  fs.cpSync(sourceHooksRoot, path.join(installedConfigRoot, 'hooks'), { recursive: true });
  hookPath = path.join(installedConfigRoot, 'hooks', 'scout-block.cjs');
});

after(() => {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
});

function runHook(toolName, toolInput) {
  return spawnSync(process.execPath, [hookPath], {
    cwd: projectRoot,
    env: {
      ...process.env,
      CK_HOOK_LOG_DIR: path.join(fixtureRoot, 'logs'),
      HOME: path.join(fixtureRoot, 'home')
    },
    input: JSON.stringify({ cwd: projectRoot, tool_name: toolName, tool_input: toolInput }),
    encoding: 'utf8'
  });
}

describe('installed scout-block runtime', () => {
  it('blocks a default excluded directory at any project depth', () => {
    const result = runHook('Read', {
      file_path: 'packages/example/node_modules/library/index.js'
    });
    assert.equal(result.status, 2, result.stderr);
  });

  it('blocks an unscoped recursive search', () => {
    const result = runHook('Glob', { pattern: '**/*.ts' });
    assert.equal(result.status, 2, result.stderr);
  });

  it('allows a scoped source read', () => {
    const result = runHook('Read', { file_path: 'packages/example/src/index.ts' });
    assert.equal(result.status, 0, result.stderr);
  });

  it('allows a recognized build command', () => {
    const result = runHook('Bash', { command: 'pnpm build' });
    assert.equal(result.status, 0, result.stderr);
  });
});
