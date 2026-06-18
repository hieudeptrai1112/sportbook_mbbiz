const ICON_BASE_PATH = '/assets/figma';

export type IconAssetFormat = 'SVG' | 'PNG';

export interface IconAsset {
  id: string;
  name: string;
  fileName: string;
  src: string;
  alt: string;
  format: IconAssetFormat;
  size: string;
  usage: string;
}

const createIconAsset = (
  id: string,
  name: string,
  fileName: string,
  format: IconAssetFormat,
  size: string,
  usage: string,
): IconAsset => ({
  id,
  name,
  fileName,
  src: `${ICON_BASE_PATH}/${fileName}`,
  alt: `${name} icon`,
  format,
  size,
  usage,
});

export const ICON_ASSETS: IconAsset[] = [
  createIconAsset(
    'logo-mark',
    'Logo Mark',
    '13a404ae-6372-42d7-b0c3-c446bc475214.svg',
    'SVG',
    '11 x 18',
    'Brand mark in the application header.',
  ),
  createIconAsset(
    'search',
    'Search',
    'a4bec56f-e50e-413d-917b-016797d3ae81.svg',
    'SVG',
    '10.5 x 10.5',
    'Search affordance in the command/search input.',
  ),
  createIconAsset(
    'keyboard-shortcut',
    'Keyboard Shortcut',
    '1c2728dc-ef07-4602-a150-6a73f4cd1729.svg',
    'SVG',
    '7 x 4.31667',
    'Small keyboard command marker in the search shortcut.',
  ),
  createIconAsset(
    'language',
    'Language',
    'ac1143f4-1b39-4829-b86c-d3790203f643.svg',
    'SVG',
    '20 x 20',
    'Language selector icon in the header.',
  ),
  createIconAsset(
    'settings',
    'Settings',
    'bcdda10d-5d94-429d-aeb4-1664cf474adc.svg',
    'SVG',
    '18 x 18',
    'Settings action icon in the header.',
  ),
  createIconAsset(
    'github',
    'GitHub',
    'fd2a3c7d-634a-4e4e-85c9-bbc89f059a8d.svg',
    'SVG',
    '11.6667 x 7',
    'GitHub link icon in the header.',
  ),
  createIconAsset(
    'support',
    'Support',
    '4b9756d8-31c9-44e7-a3d5-b8159d9a9188.svg',
    'SVG',
    '11.6667 x 11.6667',
    'Support navigation icon.',
  ),
  createIconAsset(
    'typography-nav',
    'Typography Navigation',
    'b9238733-6594-4666-b6ab-b199a6aca7e8.svg',
    'SVG',
    '11.6667 x 11.6667',
    'Typography navigation icon.',
  ),
  createIconAsset(
    'iconography-nav',
    'Iconography Navigation',
    'e1ce05d5-09c7-4fa2-a06f-d20037d6ae64.svg',
    'SVG',
    '11.6667 x 11.6667',
    'Iconography and illustration navigation icon.',
  ),
  createIconAsset(
    'breadcrumb-nav',
    'Breadcrumb Navigation',
    'c91fd4e6-3715-400c-afc3-e607a5774d04.svg',
    'SVG',
    '11.6667 x 11.6667',
    'Breadcrumb navigation icon.',
  ),
  createIconAsset(
    'data-entry-nav',
    'Data Entry Navigation',
    '3e20b364-afaa-44e7-9d9d-1a4bbf8611cc.svg',
    'SVG',
    '10.5 x 10.5',
    'Radio and checkbox navigation icon.',
  ),
  createIconAsset(
    'input-nav',
    'Input Navigation',
    '03bf2435-ca8f-437f-9a5e-d842dff607d0.svg',
    'SVG',
    '10.5 x 9.33333',
    'Input-related navigation icon.',
  ),
  createIconAsset(
    'section-nav',
    'Section Navigation',
    '75e8e428-83ff-4ef1-b5ae-51153a303bb0.svg',
    'SVG',
    '11.6667 x 7',
    'General page and data display navigation icon.',
  ),
  createIconAsset(
    'component-nav',
    'Component Navigation',
    'a267f91a-5244-487b-a70d-df817b48d1e8.svg',
    'SVG',
    '10.5 x 7',
    'Navigation component group icon.',
  ),
  createIconAsset(
    'pro-tip',
    'Pro Tip',
    '75a63650-c7f2-40db-9ddf-d94856f0917b.svg',
    'SVG',
    '11.25 x 15',
    'Pro tip panel icon.',
  ),
  createIconAsset(
    'chevron-right-small',
    'Chevron Right Small',
    '1a5154b0-3ea3-4b82-9785-a45369668f72.svg',
    'SVG',
    '3.7 x 6',
    'Compact right chevron asset.',
  ),
  createIconAsset(
    'chevron-right',
    'Chevron Right',
    'fab4cb2e-0af8-4c49-85e6-6082bfd79000.svg',
    'SVG',
    '3.7 x 6',
    'Right chevron asset.',
  ),
  createIconAsset(
    'theme-toggle',
    'Theme Toggle',
    'e6b501f2-bdca-4ab2-8df3-fffe8e840cee.svg',
    'SVG',
    '18 x 18',
    'Theme control icon asset.',
  ),
  createIconAsset(
    'figma-asset-4502f3ca',
    'Figma Asset 4502f3ca',
    '4502f3ca-bbf8-4e91-98ec-0872273c8e8a.svg',
    'SVG',
    '11.6667 x 11.6667',
    'Imported Figma icon asset. Verify the intended usage before replacing.',
  ),
  createIconAsset(
    'figma-asset-8c32da6a',
    'Figma Asset 8c32da6a',
    '8c32da6a-86bf-47b2-ba08-34fe681c45c2.svg',
    'SVG',
    '9.91667 x 11.6667',
    'Imported Figma icon asset. Verify the intended usage before replacing.',
  ),
  createIconAsset(
    'figma-asset-a6101e76',
    'Figma Asset a6101e76',
    'a6101e76-8bdf-4913-91df-2af5ddc9cc06.svg',
    'SVG',
    '10.5 x 10.5',
    'Imported Figma icon asset. Verify the intended usage before replacing.',
  ),
  createIconAsset(
    'figma-asset-5d1e97ae',
    'Figma Asset 5d1e97ae',
    '5d1e97ae-03b6-436c-bd3b-61565dc4cc63.svg',
    'SVG',
    '20 x 18',
    'Imported Figma icon asset. Verify the intended usage before replacing.',
  ),
  createIconAsset(
    'figma-asset-deeb4d2b',
    'Figma Asset deeb4d2b',
    'deeb4d2b-ad83-4742-b00e-bfd41c90b6ff.svg',
    'SVG',
    '10.5 x 10.5',
    'Imported Figma icon asset. Verify the intended usage before replacing.',
  ),
  createIconAsset(
    'figma-raster-5982432e',
    'Figma Raster 5982432e',
    '5982432e-b3b2-44d3-a458-760cb224c51d.png',
    'PNG',
    '512 x 512',
    'Imported raster asset in the Figma asset folder.',
  ),
];
