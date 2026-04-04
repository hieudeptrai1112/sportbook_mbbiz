import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const contractsDir = path.join(repoRoot, 'docs', 'component-contracts', 'components');

const requiredTopLevel = [
  'component',
  'slug',
  'implementationStatus',
  'overview',
  'states',
  'interactions',
  'api',
  'accessibility',
  'tokens',
  'examples',
  'copySnippets',
  'testMatrix',
  'changelog',
];

const qualityMinimums = {
  states: 3,
  interactions: 3,
  api: 4,
  examples: 1,
  copySnippets: 2,
  testMatrix: 3,
};

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function assert(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

function validateContract(contract, filePath) {
  const relPath = path.relative(repoRoot, filePath);
  const errors = [];

  for (const key of requiredTopLevel) {
    assert(contract[key] !== undefined, `${relPath}: missing top-level field '${key}'`, errors);
  }

  assert(
    contract.implementationStatus === 'shipped' || contract.implementationStatus === 'planned',
    `${relPath}: implementationStatus must be 'shipped' or 'planned'`,
    errors,
  );

  const overview = contract.overview ?? {};
  assert(Boolean(overview.purpose), `${relPath}: overview.purpose is required`, errors);
  assert(Array.isArray(overview.useCases) && overview.useCases.length > 0, `${relPath}: overview.useCases must contain at least one entry`, errors);
  assert(Array.isArray(overview.whenNotToUse) && overview.whenNotToUse.length > 0, `${relPath}: overview.whenNotToUse must contain at least one entry`, errors);

  for (const [key, minCount] of Object.entries(qualityMinimums)) {
    assert(Array.isArray(contract[key]), `${relPath}: ${key} must be an array`, errors);
    if (Array.isArray(contract[key])) {
      assert(contract[key].length >= minCount, `${relPath}: ${key} must contain at least ${minCount} items`, errors);
    }
  }

  const accessibility = contract.accessibility ?? {};
  for (const key of ['roles', 'keyboard', 'focus', 'aria', 'contrast']) {
    assert(Array.isArray(accessibility[key]) && accessibility[key].length > 0, `${relPath}: accessibility.${key} must contain at least one item`, errors);
  }

  const tokens = contract.tokens ?? {};
  for (const key of ['color', 'spacing', 'typography', 'radius', 'motion']) {
    assert(Array.isArray(tokens[key]), `${relPath}: tokens.${key} must be an array`, errors);
  }

  if (Array.isArray(contract.copySnippets)) {
    for (const snippet of contract.copySnippets) {
      const snippetPath = path.join(repoRoot, snippet.path ?? '');
      assert(Boolean(snippet.label), `${relPath}: copySnippets.label is required`, errors);
      assert(Boolean(snippet.path), `${relPath}: copySnippets.path is required`, errors);
      assert(fs.existsSync(snippetPath), `${relPath}: snippet file not found -> ${snippet.path}`, errors);
    }
  }

  return errors;
}

function main() {
  if (!fs.existsSync(contractsDir)) {
    console.error(`Missing contracts directory: ${contractsDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(contractsDir)
    .filter((file) => file.endsWith('.contract.json'))
    .map((file) => path.join(contractsDir, file))
    .sort();

  if (files.length === 0) {
    console.error('No contract files found.');
    process.exit(1);
  }

  const allErrors = [];

  for (const file of files) {
    const contract = readJson(file);
    const errors = validateContract(contract, file);
    allErrors.push(...errors);
  }

  if (allErrors.length > 0) {
    console.error('Component contract validation failed:');
    for (const error of allErrors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${files.length} component contracts successfully.`);
}

main();
