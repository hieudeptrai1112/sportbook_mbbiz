# mbbiz

Angular UI components and design tokens for Mbbiz.

## Docs

Full component docs, tokens, and Iconography live in the design-system docs app:

**[mbbiz Docs](https://github.com/hieudeptrai1112/sportbook_mbbiz)**

> Clone the repo and run `npm start` to open the docs locally (`http://localhost:4200`).

## Install

```bash
npm install mbbiz
```

This package expects the consuming app to provide Angular and NG-Zorro:

```bash
npm install @angular/common @angular/core @angular/forms @angular/platform-browser ng-zorro-antd
```

## Theme

Import the theme files once in the consuming application's global stylesheet:

```scss
@import 'mbbiz/theme.css';
@import 'mbbiz/zorro-bridge.less';
```

`theme.css` contains the Mbbiz semantic tokens. `zorro-bridge.less` maps the supported token subset into NG-Zorro theme variables.

## Usage

Import the standalone components you need from `mbbiz`:

```ts
import { MbbizButtonComponent, MbbizInputComponent } from 'mbbiz';
```

```ts
@Component({
  selector: 'app-root',
  imports: [MbbizButtonComponent, MbbizInputComponent],
  template: `
    <mbbiz-button>Submit</mbbiz-button>
    <mbbiz-input label="Username" placeholder="Enter username" />
  `,
})
export class AppComponent {}
```

## Components

- `MbbizButtonComponent`
- `MbbizInputComponent`
- `MbbizSearchInputComponent`
- `MbbizPasswordInputComponent`
- `MbbizTextareaComponent`
- `MbbizFloatingLabelInputComponent`
- `MbbizAffixInputComponent`
- `MbbizAffixLabelInputComponent`
- `MbbizInputTagComponent`
- `MbbizDropdownComponent`
- `MbbizDropdownTagComponent`
- `MbbizDatepickerComponent`
- `MbbizModalComponent`
- `MbbizCheckboxComponent`
- `MbbizCheckboxGroupComponent`
- `MbbizRadioComponent`
- `MbbizRadioGroupComponent`
- `MbbizSwitchComponent`
