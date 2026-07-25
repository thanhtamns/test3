#!/usr/bin/env node

const { after, describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'agentkit-hook-logger-'));
process.env.CK_HOOK_LOG_DIR = testRoot;

const logFile = path.join(testRoot, 'hook-log.jsonl');
const { createHookTimer, logHook, logHookCrash } = require('../hook-logger.cjs');

after(() => {
  fs.rmSync(testRoot, { recursive: true, force: true });
});

function resetLog() {
  fs.writeFileSync(logFile, '', 'utf8');
}

function readEntries() {
  if (!fs.existsSync(logFile)) return [];
  return fs.readFileSync(logFile, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line));
}

describe('hook-logger', () => {
  it('writes structured hook fields', () => {
    resetLog();
    logHook('privacy-block', {
      event: 'PreToolUse',
      tool: 'Grep',
      target: '.env',
      note: 'approval-required',
      status: 'block',
      exit: 2
    });

    const [entry] = readEntries();
    assert.strictEqual(entry.hook, 'privacy-block');
    assert.strictEqual(entry.event, 'PreToolUse');
    assert.strictEqual(entry.tool, 'Grep');
    assert.strictEqual(entry.target, '.env');
    assert.strictEqual(entry.note, 'approval-required');
    assert.strictEqual(entry.status, 'block');
    assert.strictEqual(entry.exit, 2);
  });

  it('merges base timer fields into the final entry', async () => {
    resetLog();
    const timer = createHookTimer('usage-context-awareness', {
      event: 'PostToolUse',
      tool: 'Grep'
    });

    await new Promise(resolve => setTimeout(resolve, 5));
    timer.end({ status: 'skip', note: 'throttled' });

    const [entry] = readEntries();
    assert.strictEqual(entry.hook, 'usage-context-awareness');
    assert.strictEqual(entry.event, 'PostToolUse');
    assert.strictEqual(entry.tool, 'Grep');
    assert.strictEqual(entry.status, 'skip');
    assert.strictEqual(entry.note, 'throttled');
    assert.ok(entry.dur >= 0);
  });

  it('normalizes crash logging', () => {
    resetLog();
    logHookCrash('scout-block', new Error('boom'), { event: 'PreToolUse', tool: 'Read' });

    const [entry] = readEntries();
    assert.strictEqual(entry.hook, 'scout-block');
    assert.strictEqual(entry.event, 'PreToolUse');
    assert.strictEqual(entry.tool, 'Read');
    assert.strictEqual(entry.status, 'crash');
    assert.strictEqual(entry.error, 'boom');
  });

  it('rotates under lock and preserves the newest entries', () => {
    const lines = Array.from({ length: 1000 }, (_, index) =>
      JSON.stringify({ hook: 'seed', status: 'ok', note: String(index) })
    );
    fs.writeFileSync(logFile, `${lines.join('\n')}\n`, 'utf8');

    logHook('hook-logger', { status: 'ok', note: 'newest' });

    const entries = readEntries();
    assert.strictEqual(entries.length, 500);
    assert.strictEqual(entries.at(-1).note, 'newest');
  });
});
