import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, 'docs', 'workflow', 'core3-code-connect-manifest.json');

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function runStep(label, command) {
  console.log(`\n[verify:core3] ${label}`);
  execSync(command, { cwd: repoRoot, stdio: 'inherit' });
}

function validateManifest() {
  const errors = [];

  assert(fs.existsSync(manifestPath), `Missing manifest file: ${manifestPath}`, errors);
  if (errors.length > 0) {
    return errors;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  assert(Array.isArray(manifest.families), 'Manifest field "families" must be an array', errors);

  for (const family of manifest.families ?? []) {
    assert(Boolean(family.name), 'Each family must include "name"', errors);
    assert(Array.isArray(family.figmaNodes) && family.figmaNodes.length > 0, `Family "${family.name}" must include at least one Figma node`, errors);
    assert(Array.isArray(family.components) && family.components.length > 0, `Family "${family.name}" must include at least one code component`, errors);

    for (const component of family.components ?? []) {
      const entry = component.entry ?? '';
      const resolved = path.join(repoRoot, entry);
      assert(Boolean(component.selector), `Family "${family.name}" has component missing "selector"`, errors);
      assert(Boolean(entry), `Family "${family.name}" has component missing "entry"`, errors);
      if (entry) {
        assert(fs.existsSync(resolved), `Component entry does not exist: ${entry}`, errors);
      }
    }
  }

  return errors;
}

function main() {
  console.log('[verify:core3] validating Figma/code manifest');
  const manifestErrors = validateManifest();
  if (manifestErrors.length > 0) {
    console.error('\n[verify:core3] Manifest validation failed:');
    for (const error of manifestErrors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  runStep('validate contracts', 'npm run contracts:validate');
  runStep('verify core3 locks', 'npm run verify:core3:locks');
  runStep('type-check preview app', 'npx tsc -p tsconfig.sportbook6vn-preview.json --noEmit');

  console.log('\n[verify:core3] PASS');
}

main();
