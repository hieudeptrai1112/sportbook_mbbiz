# SportbookMbbiz

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# Design System Documentation — Rules

## 1) Site Structure
- The documentation site MUST use a left sidebar for navigation.
- Sidebar categories MUST be sorted alphabetically (A → Z).
- Pages MUST be grouped by category in the sidebar.

## 2) Component Page Requirements
Every component page MUST include all of the following sections, in order:

1. Overview
   - Purpose, core use-cases, and when to use.
2. Variants
   - List all variants and states (default, hover, active, disabled, etc.).
3. Usage Guidelines
   - For Designers: do/don’t, layout constraints, visual hierarchy.
   - For Developers: API usage, props, events, constraints.
4. Accessibility
   - Keyboard navigation, focus order, ARIA labels, contrast notes.
5. Spacing
   - Spacing rules, padding, margins, layout specs.
6. Examples
   - Multiple usage examples, including edge cases.
7. Copyable Code
   - Code snippets that developers can copy directly.

## 3) Behavior Rules
- Every component page MUST pass a validation check for all required sections.
- Missing sections MUST block publishing or show a warning banner.
- Examples MUST include at least one real-world composition.
- Code snippets MUST be copyable (single-click copy action).

## 4) Sidebar Ordering Rules
- Categories MUST be sorted alphabetically.
- Pages within a category SHOULD be sorted alphabetically unless specified.

## 5) Enforcement
- All new component docs MUST follow this template.
- PR checks SHOULD fail if any required section is missing.
