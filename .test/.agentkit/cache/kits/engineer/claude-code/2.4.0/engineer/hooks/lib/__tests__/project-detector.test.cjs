const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { afterEach, beforeEach, describe, it } = require('node:test');

const {
  detectFramework,
  detectPackageManager,
  detectProjectType,
  isGitRepo,
  isValidPythonPath
} = require('../project-detector.cjs');

describe('project-detector', () => {
  let originalCwd;
  let testRoot;

  beforeEach(() => {
    originalCwd = process.cwd();
    testRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agentkit-project-detector-'));
    process.chdir(testRoot);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  it('derives project traits from the live workspace files', () => {
    fs.writeFileSync('pnpm-workspace.yaml', 'packages:\n  - packages/*\n');
    fs.writeFileSync('pnpm-lock.yaml', 'lockfileVersion: 9\n');
    fs.writeFileSync('package.json', JSON.stringify({ dependencies: { react: '*' } }));

    assert.equal(detectProjectType(), 'monorepo');
    assert.equal(detectPackageManager(), 'pnpm');
    assert.equal(detectFramework(), 'react');
  });

  it('honors explicit overrides without requiring fixture inventories', () => {
    assert.equal(detectProjectType('library'), 'library');
    assert.equal(detectPackageManager('bun'), 'bun');
    assert.equal(detectFramework('custom'), 'custom');
  });

  it('detects repository ancestry and rejects unsafe executable paths', () => {
    fs.mkdirSync('.git');
    fs.mkdirSync(path.join('src', 'nested'), { recursive: true });
    const executable = path.join(testRoot, 'python');
    fs.writeFileSync(executable, 'fixture');

    assert.equal(isGitRepo(path.join(testRoot, 'src', 'nested')), true);
    assert.equal(isValidPythonPath(executable), true);
    assert.equal(isValidPythonPath(`${executable};echo`), false);
  });
});
