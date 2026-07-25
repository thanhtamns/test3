#!/usr/bin/env node
/**
 * test-full-flow-edge-cases.cjs - Edge case validation for full hook flow
 */

const { checkScoutBlock } = require('../../lib/scout-checker.cjs');

console.log('=== FULL FLOW EDGE CASE VALIDATION ===\n');

const tests = [
  // Should be ALLOWED (bypass path extraction)
  { cmd: 'go build ./...', expectAllowed: true, desc: 'go build basic' },
  { cmd: 'cargo build', expectAllowed: true, desc: 'cargo build basic' },
  { cmd: 'make build', expectAllowed: true, desc: 'make build' },
  { cmd: 'make -j4', expectAllowed: true, desc: 'make with flags' },
  { cmd: 'mvn clean install', expectAllowed: true, desc: 'maven' },
  { cmd: 'gradle build', expectAllowed: true, desc: 'gradle' },
  { cmd: 'dotnet build', expectAllowed: true, desc: 'dotnet' },
  { cmd: 'npm run build', expectAllowed: true, desc: 'npm run build' },
  { cmd: 'go test ./...', expectAllowed: true, desc: 'go test' },

  // Wrapper and compound-command handling should use the composed checker.
  { cmd: 'docker build .', expectAllowed: true, desc: 'docker build' },
  { cmd: 'cd proj && go build', expectAllowed: true, desc: 'safe cd then build' },
  { cmd: 'GOOS=linux go build', expectAllowed: true, desc: 'environment prefix' },
  { cmd: 'sudo go build', expectAllowed: true, desc: 'sudo prefix' },
  { cmd: 'time go build', expectAllowed: true, desc: 'time prefix' },

  // Filesystem access to generated directories remains blocked.
  { cmd: 'ls build', expectAllowed: false, desc: 'ls build dir' },
  { cmd: 'cd build', expectAllowed: false, desc: 'cd build dir' },
];

let passed = 0;
let failed = 0;

for (const t of tests) {
  const result = checkScoutBlock({ toolName: 'Bash', toolInput: { command: t.cmd } });
  const allowed = !result.blocked;
  const success = allowed === t.expectAllowed;

  if (success) {
    console.log(`\x1b[32m✓\x1b[0m ${t.desc}: "${t.cmd}" → ${allowed ? 'ALLOWED' : 'BLOCKED'}`);
    passed++;
  } else {
    console.log(`\x1b[31m✗\x1b[0m ${t.desc}: "${t.cmd}" → ${allowed ? 'ALLOWED' : 'BLOCKED'} (expected ${t.expectAllowed ? 'ALLOWED' : 'BLOCKED'})`);
    failed++;
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);

process.exit(failed > 0 ? 1 : 0);
