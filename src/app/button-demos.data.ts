export type ButtonCodeType = 'js' | 'ts';

export type ButtonDemoVariant =
  | 'primary'
  | 'secondary'
  | 'dashed'
  | 'outline'
  | 'text'
  | 'danger'
  | 'success'
  | 'warning'
  | 'disabled'
  | 'loading';

export interface ButtonDemoAction {
  label: string;
  variant: ButtonDemoVariant;
  icon?: string;
  iconOnly?: boolean;
}

export interface ButtonDemoSection {
  id: string;
  title: string;
  description: string;
  tags: string[];
  actions: ButtonDemoAction[];
  codeJs: string;
  codeTs?: string;
}

export interface ButtonApiRow {
  property: string;
  description: string;
  type: string;
  defaultValue: string;
}

export const BUTTON_DEMO_SECTIONS: ButtonDemoSection[] = [
  {
    id: 'basic',
    title: 'Basic',
    description: 'There are primary, secondary, dashed, outline and text button types.',
    tags: ['primary', 'secondary', 'dashed', 'outline', 'text'],
    actions: [
      { label: 'Primary', variant: 'primary' },
      { label: 'Secondary', variant: 'secondary' },
      { label: 'Dashed', variant: 'dashed' },
      { label: 'Outline', variant: 'outline' },
      { label: 'Text', variant: 'text' },
    ],
    codeJs: `import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  );
};

export default App;`,
    codeTs: `import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="outline">Outline</Button>
      <Button type="text">Text</Button>
    </Space>
  );
};

export default App;`,
  },
  {
    id: 'icon',
    title: 'Icon',
    description:
      'Icons can be used in buttons. When icon is set and there are no children, width equals height.',
    tags: ['icon', 'iconOnly'],
    actions: [
      { label: 'Add', variant: 'primary', icon: '+', iconOnly: true },
      { label: 'Delete', variant: 'primary', icon: 'x' },
      { label: 'Share', variant: 'outline', icon: '+' },
    ],
    codeJs: `import { Button, Space } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
      <Button type="outline" icon={<IconPlus />}>
        Share
      </Button>
    </Space>
  );
};

export default App;`,
    codeTs: `import { Button, Space } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size="large">
      <Button type="primary" icon={<IconPlus />} />
      <Button type="primary" icon={<IconDelete />}>
        Delete
      </Button>
      <Button type="outline" icon={<IconPlus />}>
        Share
      </Button>
    </Space>
  );
};

export default App;`,
  },
  {
    id: 'status',
    title: 'Status',
    description: 'Status buttons reflect semantic intent like warning, danger and success.',
    tags: ['warning', 'danger', 'success'],
    actions: [
      { label: 'Warning', variant: 'warning' },
      { label: 'Danger', variant: 'danger' },
      { label: 'Success', variant: 'success' },
    ],
    codeJs: `import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button status="warning">Warning</Button>
      <Button status="danger">Danger</Button>
      <Button status="success">Success</Button>
    </Space>
  );
};

export default App;`,
    codeTs: `import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button status="warning">Warning</Button>
      <Button status="danger">Danger</Button>
      <Button status="success">Success</Button>
    </Space>
  );
};

export default App;`,
  },
  {
    id: 'disabled-loading',
    title: 'Disabled And Loading',
    description: 'Use disabled and loading states to prevent duplicate actions and improve feedback.',
    tags: ['disabled', 'loading'],
    actions: [
      { label: 'Disabled', variant: 'disabled' },
      { label: 'Loading', variant: 'loading' },
      { label: 'Loading', variant: 'loading', iconOnly: true },
    ],
    codeJs: `import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button disabled type="primary">
        Disabled
      </Button>
      <Button loading type="primary">
        Loading
      </Button>
      <Button loading type="primary" iconOnly />
    </Space>
  );
};

export default App;`,
    codeTs: `import { Button, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Button disabled type="primary">
        Disabled
      </Button>
      <Button loading type="primary">
        Loading
      </Button>
      <Button loading type="primary" iconOnly />
    </Space>
  );
};

export default App;`,
  },
];

export const BUTTON_API_ROWS: ButtonApiRow[] = [
  {
    property: 'type',
    description: 'Defines visual style of button.',
    type: "'primary' | 'secondary' | 'dashed' | 'outline' | 'text'",
    defaultValue: "'secondary'",
  },
  {
    property: 'status',
    description: 'Semantic status variant for contextual emphasis.',
    type: "'default' | 'warning' | 'danger' | 'success'",
    defaultValue: "'default'",
  },
  {
    property: 'size',
    description: 'Controls button size.',
    type: "'mini' | 'small' | 'default' | 'large'",
    defaultValue: "'default'",
  },
  {
    property: 'shape',
    description: 'Adjusts corner and silhouette style.',
    type: "'square' | 'round' | 'circle'",
    defaultValue: "'square'",
  },
  {
    property: 'icon',
    description: 'Adds icon before label or as icon-only button.',
    type: 'ReactNode',
    defaultValue: '-',
  },
  {
    property: 'loading',
    description: 'Shows loading spinner and disables interaction.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'disabled',
    description: 'Disables user interaction.',
    type: 'boolean',
    defaultValue: 'false',
  },
  {
    property: 'onClick',
    description: 'Click event callback.',
    type: '(event) => void',
    defaultValue: '-',
  },
];
