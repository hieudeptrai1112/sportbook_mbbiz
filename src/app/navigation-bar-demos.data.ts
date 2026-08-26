import type { MbbizNavigationBarItem } from '../../projects/mbbiz/src/lib/components/navigation-bar/navigation-bar.types';

export type NavigationBarDemoVariant =
  | 'maker'
  | 'checker'
  | '1user'
  | 'states'
  | 'l2-states'
  | 'l3-states'
  | 'l2-expand';

export interface NavigationBarDescriptionPart {
  text?: string;
  code?: string;
}

export interface NavigationBarDemoSection {
  id: string;
  title: string;
  descriptionParts: NavigationBarDescriptionPart[];
  tags: string[];
  variant: NavigationBarDemoVariant;
  snippetTs: string;
}

export interface NavigationBarApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export interface NavigationBarVariableRow {
  token: string;
  value: string;
  appliesTo: string;
  notes: string;
}

export interface NavigationBarVariableGroup {
  title: string;
  rows: NavigationBarVariableRow[];
}

export const NAVIGATION_BAR_DEMO_SECTIONS: NavigationBarDemoSection[] = [
  {
    id: 'maker',
    title: 'Maker',
    descriptionParts: [
      { code: 'variant="maker"' },
      {
        text: ' renders the L1 sidebar with logo, 15 menu items, hidden scrollbar, and click-to-activate. Hover an L1 item with children to open the L2 panel.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'variant=maker',
      'figma=node 20122:15095',
      'figma=node 20122:15441',
      'figma=node 20122:15457',
      'figma=node 20122:15474',
      'figma=node 20122:15489',
      'figma=node 20122:15512',
      'figma=node 20122:15535',
      'figma=node 20122:15552',
      'figma=node 20122:15569',
      'figma=node 20122:15614',
    ],
    variant: 'maker',
    snippetTs: `import { Component, signal } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-maker-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    <mbbiz-navigation-bar
      [activeId]="activeId()"
      (itemClick)="onItemClick($event)"
    />
  \`,
})
export class NavigationBarMakerDemoComponent {
  protected readonly activeId = signal('home');

  protected onItemClick(event: { item: MbbizNavigationBarItem }) {
    this.activeId.set(event.item.id);
  }
}`,
  },
  {
    id: 'checker',
    title: 'Checker',
    descriptionParts: [
      { code: 'variant="checker"' },
      {
        text: ' renders the Checker L1 sidebar with the same tokens as Maker and 12 menu items. Hover an L1 item with children to open the L2 panel.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'variant=checker',
      'figma=node 20122:18345',
      'figma=node 20122:18420',
    ],
    variant: 'checker',
    snippetTs: `import { Component, signal } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-checker-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    <mbbiz-navigation-bar
      variant="checker"
      [activeId]="activeId()"
      (itemClick)="onItemClick($event)"
    />
  \`,
})
export class NavigationBarCheckerDemoComponent {
  protected readonly activeId = signal('home');

  protected onItemClick(event: { item: MbbizNavigationBarItem }) {
    this.activeId.set(event.item.id);
  }
}`,
  },
  {
    id: '1user',
    title: '1 User',
    descriptionParts: [
      { code: 'variant="1user"' },
      {
        text: ' renders the 1 User L1 sidebar with the same tokens as Maker and 12 menu items.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'variant=1user',
      'figma=node 20122:16326',
    ],
    variant: '1user',
    snippetTs: `import { Component, signal } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-one-user-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    <mbbiz-navigation-bar
      variant="1user"
      [activeId]="activeId()"
      (itemClick)="onItemClick($event)"
    />
  \`,
})
export class NavigationBarOneUserDemoComponent {
  protected readonly activeId = signal('home');

  protected onItemClick(event: { item: MbbizNavigationBarItem }) {
    this.activeId.set(event.item.id);
  }
}`,
  },
  {
    id: 'states',
    title: 'Item States',
    descriptionParts: [
      { code: 'state' },
      {
        text: ' covers default, hover, active, disabled, and the New tag from Navigation Lv 1.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'states=default/hover/active/disabled',
      'showNew=true',
    ],
    variant: 'states',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-states-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    @for (items of stateItems; track items[0].id) {
      <mbbiz-navigation-bar [items]="items" [showLogo]="false" />
    }
  \`,
})
export class NavigationBarStatesDemoComponent {
  protected readonly stateItems: readonly MbbizNavigationBarItem[][] = [
    [{ id: 'default', label: 'Trang chủ', icon: 'alinear_home', state: 'default' }],
    [{ id: 'hover', label: 'Trang chủ', icon: 'alinear_home', state: 'hover' }],
    [{ id: 'active', label: 'Trang chủ', icon: 'alinear_home', iconActive: 'abold_home', state: 'active' }],
    [{ id: 'disabled', label: 'Trang chủ', icon: 'alinear_home', disabled: true }],
    [{ id: 'new', label: 'Trang chủ', icon: 'alinear_home', showNew: true }],
  ];
}`,
  },
  {
    id: 'l2-states',
    title: 'Level 2 Item',
    descriptionParts: [
      { code: 'children' },
      {
        text: ' on an L1 item opens the flyout. L2 item states: default, hover, active/expanded, coming soon, and coming soon expanded.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'figma=node 20122:17329',
      'figma=node 20122:13790',
    ],
    variant: 'l2-states',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-l2-states-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    <mbbiz-navigation-bar
      [items]="items"
      openId="accounts"
      [showLogo]="false"
    />
  \`,
})
export class NavigationBarL2StatesDemoComponent {
  protected readonly items: readonly MbbizNavigationBarItem[] = [
    {
      id: 'accounts',
      label: 'Tài khoản',
      icon: 'alinear_wallet',
      iconActive: 'abold_wallet',
      children: [
        { id: 'statement', label: 'Sao kê giao dịch' },
        { id: 'qr', label: 'Dịch vụ QR' },
      ],
    },
  ];
}`,
  },
  {
    id: 'l3-states',
    title: 'Level 3 Item',
    descriptionParts: [
      { code: 'children' },
      {
        text: ' on an L2 item expands an accordion of L3 rows aligned with the L2 label, with Normal, Hover, Active, Coming soon, New, and Favourite tags.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'figma=node 20122:17421',
    ],
    variant: 'l3-states',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-l3-states-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    <mbbiz-navigation-bar
      [items]="items"
      openId="payments"
      [expandedIds]="['domestic']"
      [showLogo]="false"
    />
  \`,
})
export class NavigationBarL3StatesDemoComponent {
  protected readonly items: readonly MbbizNavigationBarItem[] = [
    {
      id: 'payments',
      label: 'Thanh toán và Chuyển tiền',
      icon: 'alinear_payment_transfer',
      children: [
        {
          id: 'domestic',
          label: 'Chuyển tiền trong nước',
          children: [
            { id: 'transfer', label: 'Level 3' },
            { id: 'new', label: 'Level 3', showNew: true },
          ],
        },
      ],
    },
  ];
}`,
  },
  {
    id: 'l2-expand',
    title: 'Level 2 Expand',
    descriptionParts: [
      { code: 'expandedIds' },
      {
        text: ' collapses or expands an L2 parent with chevron down/up and nested L3 items.',
      },
    ],
    tags: [
      'selector=mbbiz-navigation-bar',
      'figma=node 20122:13915',
    ],
    variant: 'l2-expand',
    snippetTs: `import { Component } from '@angular/core';
import { MbbizNavigationBarComponent, type MbbizNavigationBarItem } from 'mbbiz';

@Component({
  selector: 'app-navigation-bar-l2-expand-demo',
  standalone: true,
  imports: [MbbizNavigationBarComponent],
  template: \`
    <mbbiz-navigation-bar
      [items]="items"
      openId="payments"
      [expandedIds]="['domestic']"
      [showLogo]="false"
    />
  \`,
})
export class NavigationBarL2ExpandDemoComponent {
  protected readonly items: readonly MbbizNavigationBarItem[] = [
    {
      id: 'payments',
      label: 'Thanh toán và Chuyển tiền',
      icon: 'alinear_payment_transfer',
      iconActive: 'abold_payment_transfer',
      children: [
        {
          id: 'domestic',
          label: 'Chuyển tiền trong nước',
          children: [
            { id: 'transfer', label: 'Chuyển tiền' },
            { id: 'payroll', label: 'Chuyển tiền lô/lương' },
            { id: 'fx-domestic', label: 'Chuyển ngoại tệ trong nước' },
            { id: 'citad', label: 'Chuyển tiền theo mã Citad' },
          ],
        },
      ],
    },
  ];
}`,
  },
];

export interface NavigationBarSubmenuPreview {
  id: string;
  label: string;
  items: readonly MbbizNavigationBarItem[];
  openId: string;
  expandedIds?: readonly string[];
}

const L2_CHEVRON_CHILD = [{ id: 'l3-placeholder', label: 'Level 3' }] as const;

export const NAVIGATION_BAR_L2_STATE_PREVIEWS: readonly NavigationBarSubmenuPreview[] = [
  {
    id: 'default',
    label: 'default',
    openId: 'accounts',
    items: [
      {
        id: 'accounts',
        label: 'Tài khoản',
        icon: 'alinear_wallet',
        iconActive: 'abold_wallet',
        children: [{ id: 'l2-default', label: 'Level 2', children: L2_CHEVRON_CHILD }],
      },
    ],
  },
  {
    id: 'hover',
    label: 'hover',
    openId: 'accounts',
    items: [
      {
        id: 'accounts',
        label: 'Tài khoản',
        icon: 'alinear_wallet',
        iconActive: 'abold_wallet',
        children: [{ id: 'l2-hover', label: 'Level 2', state: 'hover', children: L2_CHEVRON_CHILD }],
      },
    ],
  },
  {
    id: 'active',
    label: 'active',
    openId: 'accounts',
    items: [
      {
        id: 'accounts',
        label: 'Tài khoản',
        icon: 'alinear_wallet',
        iconActive: 'abold_wallet',
        children: [{ id: 'l2-active', label: 'Level 2', state: 'active', children: L2_CHEVRON_CHILD }],
      },
    ],
  },
  {
    id: 'coming-soon',
    label: 'coming soon',
    openId: 'accounts',
    items: [
      {
        id: 'accounts',
        label: 'Tài khoản',
        icon: 'alinear_wallet',
        iconActive: 'abold_wallet',
        children: [{ id: 'l2-soon', label: 'Level 2', comingSoon: true, children: L2_CHEVRON_CHILD }],
      },
    ],
  },
  {
    id: 'coming-soon-expanded',
    label: 'coming soon expanded',
    openId: 'accounts',
    items: [
      {
        id: 'accounts',
        label: 'Tài khoản',
        icon: 'alinear_wallet',
        iconActive: 'abold_wallet',
        children: [{ id: 'l2-soon-open', label: 'Level 2', comingSoon: true, state: 'active', children: L2_CHEVRON_CHILD }],
      },
    ],
  },
];

export const NAVIGATION_BAR_L3_STATE_PREVIEWS: readonly NavigationBarSubmenuPreview[] = [
  {
    id: 'normal',
    label: 'normal',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [{ id: 'domestic', label: 'Chuyển tiền trong nước', children: [{ id: 'l3-normal', label: 'Level 3' }] }],
      },
    ],
  },
  {
    id: 'hover',
    label: 'hover',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [{ id: 'domestic', label: 'Chuyển tiền trong nước', children: [{ id: 'l3-hover', label: 'Level 3', state: 'hover' }] }],
      },
    ],
  },
  {
    id: 'active',
    label: 'active',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [{ id: 'domestic', label: 'Chuyển tiền trong nước', children: [{ id: 'l3-active', label: 'Level 3', state: 'active' }] }],
      },
    ],
  },
  {
    id: 'coming-soon',
    label: 'coming soon',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [{ id: 'domestic', label: 'Chuyển tiền trong nước', children: [{ id: 'l3-soon', label: 'Level 3', comingSoon: true }] }],
      },
    ],
  },
  {
    id: 'new',
    label: 'new',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [{ id: 'domestic', label: 'Chuyển tiền trong nước', children: [{ id: 'l3-new', label: 'Level 3', showNew: true }] }],
      },
    ],
  },
  {
    id: 'favourite',
    label: 'favourite',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [{ id: 'domestic', label: 'Chuyển tiền trong nước', children: [{ id: 'l3-fav', label: 'Level 3', favourite: true }] }],
      },
    ],
  },
];

export const NAVIGATION_BAR_L2_EXPAND_PREVIEWS: readonly NavigationBarSubmenuPreview[] = [
  {
    id: 'collapsed',
    label: 'expand=no',
    openId: 'payments',
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [
          {
            id: 'domestic',
            label: 'Chuyển tiền trong nước',
            children: [
              { id: 'transfer', label: 'Chuyển tiền' },
              { id: 'payroll', label: 'Chuyển tiền lô/lương' },
              { id: 'fx-domestic', label: 'Chuyển ngoại tệ trong nước' },
              { id: 'citad', label: 'Chuyển tiền theo mã Citad' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'expanded',
    label: 'expand=yes',
    openId: 'payments',
    expandedIds: ['domestic'],
    items: [
      {
        id: 'payments',
        label: 'Thanh toán và Chuyển tiền',
        icon: 'alinear_payment_transfer',
        iconActive: 'abold_payment_transfer',
        children: [
          {
            id: 'domestic',
            label: 'Chuyển tiền trong nước',
            children: [
              { id: 'transfer', label: 'Chuyển tiền' },
              { id: 'payroll', label: 'Chuyển tiền lô/lương' },
              { id: 'fx-domestic', label: 'Chuyển ngoại tệ trong nước' },
              { id: 'citad', label: 'Chuyển tiền theo mã Citad' },
            ],
          },
        ],
      },
    ],
  },
];

export const NAVIGATION_BAR_API_ROWS: NavigationBarApiRow[] = [
  {
    property: 'variant',
    description: 'Preset that fills items when the items input is empty.',
    type: "'maker' | 'checker' | '1user'",
    defaultValue: "'maker'",
  },
  {
    property: 'items',
    description: 'Explicit L1 items. Empty array uses the Maker, Checker, or 1 User preset from variant.',
    type: 'readonly MbbizNavigationBarItem[]',
    defaultValue: '[]',
  },
  {
    property: 'activeId',
    description: 'Id of the active L1, L2, or L3 item. L1 swaps to iconActive. L2/L3 leaves use semibold.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'openId',
    description: 'Controlled L1 id that keeps the L2 flyout open. Empty uses hover.',
    type: 'string | null',
    defaultValue: 'null',
  },
  {
    property: 'expandedIds',
    description: 'L2 item ids that start expanded and reveal L3.',
    type: 'readonly string[]',
    defaultValue: '[]',
  },
  {
    property: 'showLogo',
    description: 'Shows the MB Small + Text logo above the list.',
    type: 'boolean',
    defaultValue: 'true',
  },
  {
    property: 'ariaLabel',
    description: 'Accessible label for the nav landmark.',
    type: 'string',
    defaultValue: "'Navigation'",
  },
  {
    property: 'itemClick',
    description: 'Emits the clicked L1/L2/L3 item when it is not disabled or coming soon. Parents with children toggle expand instead.',
    type: 'output<MbbizNavigationItemClick>',
    defaultValue: '-',
  },
];

export const NAVIGATION_BAR_VARIABLE_GROUPS: NavigationBarVariableGroup[] = [
  {
    title: 'Navigation Bar Color Tokens',
    rows: [
      { token: 'background/primary', value: 'white/100%', appliesTo: 'Bar background', notes: 'Maps to --mbbiz-color-nav-background.' },
      { token: 'background/disable3', value: 'grayscale/200', appliesTo: 'Item hover fill', notes: 'Maps to --mbbiz-color-nav-item-hover-bg.' },
      { token: 'background/brand-primary4', value: 'blue/200', appliesTo: 'Item active fill', notes: 'Maps to --mbbiz-color-nav-item-active-bg.' },
      { token: 'icon/brand-primary1', value: 'blue/500', appliesTo: 'Default, hover, and active icon', notes: 'Maps to --mbbiz-color-nav-icon.' },
      { token: 'icon/disable1', value: 'grayscale/600', appliesTo: 'Disabled icon', notes: 'Maps to --mbbiz-color-nav-icon-disabled.' },
      { token: 'text/primary', value: 'darkblue/1000', appliesTo: 'Default and active label, New tag text', notes: 'Maps to --mbbiz-color-nav-label, --mbbiz-color-nav-label-active, and --mbbiz-color-nav-tag-text.' },
      { token: 'text/disable1', value: 'grayscale/600', appliesTo: 'Disabled label', notes: 'Maps to --mbbiz-color-nav-label-disabled.' },
      { token: 'background/brand-tertiary2', value: 'turquoise/400', appliesTo: 'New tag fill', notes: 'Maps to --mbbiz-color-nav-tag-bg.' },
      { token: 'text/secondary', value: 'bluegrey/700', appliesTo: 'L2/L3 hover label', notes: 'Maps to --mbbiz-color-nav-l2-label-hover.' },
      { token: 'icon/neutral1', value: 'darkblue/1000', appliesTo: 'L2 chevron default and active', notes: 'Maps to --mbbiz-color-nav-l2-chevron.' },
      { token: 'icon/neutral4', value: 'bluegrey/700', appliesTo: 'L2 chevron hover', notes: 'Maps to --mbbiz-color-nav-l2-chevron-hover.' },
      { token: 'background/secondary', value: 'bluegrey/100', appliesTo: 'Coming soon tag fill', notes: 'Maps to --mbbiz-color-nav-tag-coming-soon-bg.' },
      { token: 'background/brand-secondary5', value: 'purple/100', appliesTo: 'Favourite tag fill', notes: 'Maps to --mbbiz-color-nav-tag-favourite-bg.' },
      { token: 'text/brand-secondary1', value: 'purple/500', appliesTo: 'Favourite tag text', notes: 'Maps to --mbbiz-color-nav-tag-favourite-text.' },
    ],
  },
  {
    title: 'Navigation Bar Layout Specs',
    rows: [
      { token: 'padding/s', value: '8px', appliesTo: 'Bar horizontal padding', notes: 'Figma node 20122:15095.' },
      { token: 'spacing/2xl', value: '24px', appliesTo: 'Bar vertical padding and logo-to-list gap', notes: 'Figma node 20122:15095.' },
      { token: 'spacing/s', value: '8px', appliesTo: 'Gap between L1 items', notes: 'Maps to --mbbiz-nav-list-gap.' },
      { token: 'padding/xs', value: '4px', appliesTo: 'Item padding', notes: 'Maps to --mbbiz-nav-item-padding.' },
      { token: 'spacing/xs', value: '4px', appliesTo: 'Icon to label gap', notes: 'Maps to --mbbiz-nav-item-gap.' },
      { token: 'radius/xs', value: '4px', appliesTo: 'Item corner radius', notes: 'Maps to --mbbiz-nav-item-radius.' },
      { token: 'padding/xxs', value: '2px', appliesTo: 'New tag vertical padding', notes: 'Paired with padding/xs on the x-axis.' },
      { token: 'radius/4xl', value: '40px', appliesTo: 'New tag corner radius', notes: 'Maps to --mbbiz-nav-tag-radius.' },
      { token: 'nav/bar/size', value: '116 × 810', appliesTo: 'Bar width and max height', notes: 'List scrolls inside this frame.' },
      { token: 'nav/shadow', value: '2px 0 4px #00000014', appliesTo: 'Bar drop shadow', notes: 'Figma effect EF/2.' },
      { token: 'nav/l2/size', value: '308 × 810', appliesTo: 'L2 flyout width and height', notes: 'Figma node 20122:15429.' },
      { token: 'spacing/5xl', value: '40px', appliesTo: 'Gap between L2 items', notes: 'Maps to submenu list gap.' },
      { token: 'spacing/l', value: '16px', appliesTo: 'L2 label to chevron/tag gap', notes: 'Figma node 20122:17329.' },
      { token: 'padding/none', value: '0px', appliesTo: 'L3 item padding', notes: 'Maps to --mbbiz-nav-l3-padding. Figma node 20122:15574.' },
      { token: 'radius/s', value: '8px', appliesTo: 'L2 panel top/bottom right radius', notes: 'Figma node 20122:15429.' },
    ],
  },
];

export const NAVIGATION_BAR_VARIABLE_NOTES = [
  'Color rows bind to semantic aliases shared by Maker (20122:15095), Checker (20122:18345), and 1 User (20122:16326).',
  'L2 flyout and item states follow 20122:15429, 20122:17329, 20122:13790, 20122:13915, and 20122:17421.',
  'The list keeps overflow scroll with the scrollbar hidden (scrollbar-width: none and webkit scrollbar display none).',
];
