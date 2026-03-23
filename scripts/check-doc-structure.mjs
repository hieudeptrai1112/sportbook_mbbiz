import { promises as fs } from 'node:fs';
import path from 'node:path';

const STORIES_DIR = path.resolve('src', 'stories');
const REQUIRED_HEADINGS = [
  'Overview',
  'Variants',
  'Usage Guidelines for Designers',
  'Usage Guidelines for Developers',
  'Accessibility',
  'Spacing',
  'Examples',
  'Copyable Code'
];

const COMPONENT_TITLE_PREFIX = "export const meta = { title: 'Components/";

const listMdxFiles = async () => {
  const entries = await fs.readdir(STORIES_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'))
    .map((entry) => path.join(STORIES_DIR, entry.name));
};

const isComponentDoc = (content) => content.includes(COMPONENT_TITLE_PREFIX);

const findMissingHeadings = (content) =>
  REQUIRED_HEADINGS.filter((heading) => !content.includes(`## ${heading}`));

const main = async () => {
  const files = await listMdxFiles();
  const issues = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    if (!isComponentDoc(content)) continue;

    const missing = findMissingHeadings(content);
    if (missing.length > 0) {
      issues.push({ file, missing });
    }
  }

  if (issues.length === 0) {
    console.log('Doc structure check passed.');
    return;
  }

  console.error('Doc structure check failed. Missing sections found:');
  for (const issue of issues) {
    console.error(`- ${issue.file}`);
    for (const heading of issue.missing) {
      console.error(`  - ${heading}`);
    }
  }
  process.exit(1);
};

main().catch((error) => {
  console.error('Doc structure check failed with error:', error);
  process.exit(1);
});
