# sportbook6vn

Angular UI components and design tokens for Sportbook6VN.

## Install

```bash
npm install sportbook6vn
```

This package expects the consuming app to provide Angular and NG-Zorro:

```bash
npm install @angular/common @angular/core @angular/forms @angular/platform-browser ng-zorro-antd
```

## Theme

Import the theme files once in the consuming application's global stylesheet:

```scss
@import 'sportbook6vn/theme.css';
@import 'sportbook6vn/zorro-bridge.less';
```

`theme.css` contains the Sportbook6VN semantic tokens. `zorro-bridge.less` maps the supported token subset into NG-Zorro theme variables.

## Usage

Import the standalone components you need from `sportbook6vn`:

```ts
import { Sportbook6vnButtonComponent, Sportbook6vnInputComponent } from 'sportbook6vn';
```

```ts
@Component({
  selector: 'app-root',
  imports: [Sportbook6vnButtonComponent, Sportbook6vnInputComponent],
  template: `
    <sportbook6vn-button>Submit</sportbook6vn-button>
    <sportbook6vn-input label="Username" placeholder="Enter username" />
  `,
})
export class AppComponent {}
```

## Components

- `Sportbook6vnButtonComponent`
- `Sportbook6vnInputComponent`
- `Sportbook6vnSearchInputComponent`
- `Sportbook6vnPasswordInputComponent`
- `Sportbook6vnTextareaComponent`
- `Sportbook6vnFloatingLabelInputComponent`
- `Sportbook6vnAffixInputComponent`
- `Sportbook6vnAffixLabelInputComponent`
- `Sportbook6vnInputTagComponent`
- `Sportbook6vnDropdownComponent`
- `Sportbook6vnDropdownTagComponent`
- `Sportbook6vnDatepickerComponent`
- `Sportbook6vnModalComponent`
- `Sportbook6vnCheckboxComponent`
- `Sportbook6vnCheckboxGroupComponent`
- `Sportbook6vnRadioComponent`
- `Sportbook6vnRadioGroupComponent`
- `Sportbook6vnSwitchComponent`
