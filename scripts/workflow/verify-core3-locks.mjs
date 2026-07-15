import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const previewHtmlPath = path.join(
  repoRoot,
  'projects',
  'mbbiz-preview',
  'src',
  'app',
  'app.component.html',
);
const docsAppHtmlPath = path.join(repoRoot, 'src', 'app', 'app.html');
const publicApiPath = path.join(
  repoRoot,
  'projects',
  'mbbiz',
  'src',
  'public-api.ts',
);
const baselineLockPath = path.join(
  repoRoot,
  'docs',
  'workflow',
  'core3-baseline.lock.json',
);
const apiLockPath = path.join(
  repoRoot,
  'docs',
  'workflow',
  'core3-api-lock.json',
);
const mappingPath = path.join(
  repoRoot,
  'docs',
  'workflow',
  'core3-preview-app-map.json',
);
const manifestPath = path.join(
  repoRoot,
  'docs',
  'workflow',
  'core3-code-connect-manifest.json',
);

function normalizeSpaces(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fileSha256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

function extractSelector(fileContent) {
  const match = fileContent.match(/selector:\s*'([^']+)'/);
  return match ? match[1] : null;
}

function extractInputs(fileContent) {
  const inputRegex =
    /readonly\s+([A-Za-z0-9_]+)\s*=\s*input(?:<([^>]+)>)?\(([^)]*)\)\s*;/g;
  const inputs = [];
  let match = inputRegex.exec(fileContent);
  while (match) {
    inputs.push({
      name: match[1],
      type: match[2] ? normalizeSpaces(match[2]) : null,
      default: normalizeSpaces(match[3]),
    });
    match = inputRegex.exec(fileContent);
  }

  return inputs;
}

function extractOutputs(fileContent) {
  const outputRegex =
    /readonly\s+([A-Za-z0-9_]+)\s*=\s*output(?:<([^>]+)>)?\(([^)]*)\)\s*;/g;
  const outputs = [];
  let match = outputRegex.exec(fileContent);
  while (match) {
    outputs.push({
      name: match[1],
      type: match[2] ? normalizeSpaces(match[2]) : null,
    });
    match = outputRegex.exec(fileContent);
  }

  return outputs;
}

function compareListByIndex(componentName, label, expected, actual, errors) {
  if (expected.length !== actual.length) {
    errors.push(
      `[${componentName}] ${label} count mismatch: expected ${expected.length}, received ${actual.length}`,
    );
    return;
  }

  for (let index = 0; index < expected.length; index += 1) {
    const expectedItem = expected[index];
    const actualItem = actual[index];
    const expectedNormalized = JSON.stringify(expectedItem);
    const actualNormalized = JSON.stringify(actualItem);
    if (expectedNormalized !== actualNormalized) {
      errors.push(
        `[${componentName}] ${label}[${index}] mismatch: expected ${expectedNormalized}, received ${actualNormalized}`,
      );
    }
  }
}

function validateBaseline(errors) {
  assert(fs.existsSync(baselineLockPath), `Missing baseline lock: ${baselineLockPath}`, errors);
  if (errors.length > 0) {
    return;
  }

  const baselineLock = readJson(baselineLockPath);
  assert(
    Array.isArray(baselineLock.files) && baselineLock.files.length > 0,
    'Baseline lock must include at least one file',
    errors,
  );

  for (const row of baselineLock.files ?? []) {
    const absolutePath = path.join(repoRoot, row.path);
    assert(fs.existsSync(absolutePath), `Baseline file does not exist: ${row.path}`, errors);
    if (!fs.existsSync(absolutePath)) {
      continue;
    }

    const currentHash = fileSha256(absolutePath);
    if (currentHash !== row.sha256) {
      errors.push(
        `Baseline drift detected: ${row.path} expected ${row.sha256}, received ${currentHash}`,
      );
    }
  }
}

function validateApiLock(errors) {
  assert(fs.existsSync(apiLockPath), `Missing API lock: ${apiLockPath}`, errors);
  if (errors.length > 0) {
    return;
  }

  const apiLock = readJson(apiLockPath);
  const previewHtml = fs.readFileSync(previewHtmlPath, 'utf8');
  const publicApi = fs.readFileSync(publicApiPath, 'utf8');

  assert(
    Array.isArray(apiLock.components) && apiLock.components.length > 0,
    'API lock must include at least one component',
    errors,
  );

  for (const component of apiLock.components ?? []) {
    const absoluteEntry = path.join(repoRoot, component.entry);
    assert(fs.existsSync(absoluteEntry), `[${component.name}] entry file missing: ${component.entry}`, errors);
    if (!fs.existsSync(absoluteEntry)) {
      continue;
    }

    const content = fs.readFileSync(absoluteEntry, 'utf8');
    const selector = extractSelector(content);
    if (selector !== component.selector) {
      errors.push(
        `[${component.name}] selector mismatch: expected ${component.selector}, received ${selector ?? 'null'}`,
      );
    }

    const actualInputs = extractInputs(content);
    const actualOutputs = extractOutputs(content);
    compareListByIndex(component.name, 'inputs', component.inputs, actualInputs, errors);
    compareListByIndex(component.name, 'outputs', component.outputs, actualOutputs, errors);

    assert(
      publicApi.includes(`export * from '${component.publicApiExport}';`),
      `[${component.name}] public-api.ts missing export: ${component.publicApiExport}`,
      errors,
    );

    for (const selectorRef of component.previewSelectors ?? []) {
      assert(
        previewHtml.includes(`<${selectorRef}`),
        `[${component.name}] preview usage missing selector <${selectorRef}>`,
        errors,
      );
    }
  }
}

function validatePreviewAppMapping(errors) {
  assert(fs.existsSync(mappingPath), `Missing preview map: ${mappingPath}`, errors);
  assert(fs.existsSync(manifestPath), `Missing core3 manifest: ${manifestPath}`, errors);
  if (errors.length > 0) {
    return;
  }

  const previewMap = readJson(mappingPath);
  const manifest = readJson(manifestPath);
  const previewHtml = fs.readFileSync(previewHtmlPath, 'utf8');
  const docsAppHtml = fs.readFileSync(docsAppHtmlPath, 'utf8');
  const manifestFamilyNames = new Set((manifest.families ?? []).map((family) => family.name));

  assert(
    Array.isArray(previewMap.families) && previewMap.families.length > 0,
    'Preview map must include at least one family',
    errors,
  );

  for (const family of previewMap.families ?? []) {
    assert(Boolean(family.name), 'Preview map family missing "name"', errors);
    assert(
      manifestFamilyNames.has(family.name),
      `Preview map family "${family.name}" does not exist in core3 manifest`,
      errors,
    );
    assert(
      Array.isArray(family.figmaNodes) && family.figmaNodes.length > 0,
      `Preview map family "${family.name}" must include figmaNodes`,
      errors,
    );

    if (family.previewSection) {
      assert(
        previewHtml.includes(family.previewSection),
        `Preview map family "${family.name}" references missing section "${family.previewSection}"`,
        errors,
      );
    }

    for (const selector of family.previewSelectors ?? []) {
      assert(
        previewHtml.includes(`<${selector}`),
        `Preview map family "${family.name}" missing selector <${selector}> in preview`,
        errors,
      );
    }

    for (const entry of family.libraryEntries ?? []) {
      const absoluteEntry = path.join(repoRoot, entry);
      assert(fs.existsSync(absoluteEntry), `Preview map entry missing: ${entry}`, errors);
    }

    for (const target of family.docsAppTargets ?? []) {
      const absoluteTarget = path.join(repoRoot, target);
      assert(fs.existsSync(absoluteTarget), `Preview map docs app target missing: ${target}`, errors);
    }

    for (const selector of family.appSelectors ?? []) {
      assert(
        docsAppHtml.includes(`<${selector}`),
        `Preview map family "${family.name}" missing selector <${selector}> in docs app`,
        errors,
      );
    }
  }
}

function main() {
  const errors = [];
  validateBaseline(errors);
  validateApiLock(errors);
  validatePreviewAppMapping(errors);

  if (errors.length > 0) {
    console.error('\n[verify:core3:locks] FAILED');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log('[verify:core3:locks] PASS');
}

main();
