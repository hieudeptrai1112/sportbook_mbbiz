import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const lockPath = path.join(repoRoot, 'docs', 'workflow', 'core3-baseline.lock.json');

if (!fs.existsSync(lockPath)) {
  console.error(`Missing baseline lock file: ${lockPath}`);
  process.exit(1);
}

const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
if (!Array.isArray(lock.files) || lock.files.length === 0) {
  console.error('Baseline lock must contain at least one file.');
  process.exit(1);
}

for (const row of lock.files) {
  const absolutePath = path.join(repoRoot, row.path);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Cannot update hash for missing file: ${row.path}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath);
  row.sha256 = crypto.createHash('sha256').update(content).digest('hex');
}

lock.version = new Date().toISOString().slice(0, 10);
fs.writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`, 'utf8');

console.log(`[core3-baseline] lock file updated: ${path.relative(repoRoot, lockPath)}`);
