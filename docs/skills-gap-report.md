# Figma Skills Gap Report

## Installed (local)
- Checklist: `docs/installed-skills-checklist.md`
- Machine-readable: `docs/installed-skills.json`

## Figma-focused skills you already have
- figma-use
- figma-generate-design
- figma-generate-library
- figma-create-new-file
- figma-code-connect
- figma-generate-diagram
- figma-use-figjam
- figma-use-slides
- figma-use-motion
- figma-implement-motion
- figma-swiftui
- figma-implement-design
- cc-figma-tokens
- cc-figma-component
- sync-figma-token

## Candidate community skills not detected locally
(derived from Figma community resource index snippets)
- apca-compliance-figma
- audit-accessibility-figma
- lint-design-figma
- scan-code-accessibility-figma
- analyze-component-set-figma
- arrange-component-set-figma
- component-properties-figma
- deep-component-figma
- design-react-api
- generate-component-doc-figma
- reconstruct-component-figma
- bridge-ds
- build-slides-figma
- bulk-capture
- annotations-figma
- check-design-parity-figma
- delight-audit
- design-narrative
- screens-to-ia
- design-system-inventory-figma
- ds-init-figma
- ds-compliance-audit
- export-tokens-figma
- generate-tokens-from-figma
- import-tokens-figma
- library-variables-figma
- manage-variables-figma
- setup-design-tokens-figma
- create-figjam-content
- figjam-builder
- workshop-board

## Install workflow
Because the public index is evolving, validate each skill ID first:

```bash
npx skills find <skill-name>
```

Then install the exact returned package:

```bash
npx skills add <owner/repo@skill-id> -g -y
```

Bulk update installed skills later:

```bash
npx skills check
npx skills update
```
