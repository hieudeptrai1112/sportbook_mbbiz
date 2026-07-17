import type { IconDefinition } from '@hieultra/icon';
import {
  ICON_SIZE_PX,
  allIcons,
  type IconSizeToken,
} from '@hieultra/icon';

export type IconLibraryFamily = 'linear' | 'bold' | 'general';

export interface IconLibraryEntry {
  name: string;
  label: string;
  file: string;
  family: IconLibraryFamily;
  definition: IconDefinition;
}

export interface IconLibraryGroup {
  id: string;
  family: IconLibraryFamily;
  title: string;
  description: string;
  entries: IconLibraryEntry[];
}

export interface IconSizePreviewRow {
  token: IconSizeToken;
  alias: string;
  px: number;
}

function toLabel(name: string): string {
  const stripped = name
    .replace(/^abold_/, '')
    .replace(/^alinear_/, '')
    .replace(/^action-/, '')
    .replace(/^nav-/, '');

  return stripped
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function toFamily(name: string): IconLibraryFamily {
  if (name.startsWith('abold_') || name.startsWith('abold-')) {
    return 'bold';
  }
  if (name.startsWith('alinear_') || name.startsWith('alinear-')) {
    return 'linear';
  }
  return 'general';
}

function toFileHint(name: string, family: IconLibraryFamily): string {
  if (family === 'bold') {
    return `ABold_${toLabel(name).replace(/\s+/g, '')}.svg`;
  }
  if (family === 'linear') {
    return `ALinear_${toLabel(name).replace(/\s+/g, '')}.svg`;
  }
  return `ic-${name}.svg`;
}

export const ICON_LIBRARY_ENTRIES: IconLibraryEntry[] = allIcons.map((definition) => {
  const family = toFamily(definition.name);
  return {
    name: definition.name,
    label: toLabel(definition.name),
    file: toFileHint(definition.name, family),
    family,
    definition,
  };
});

export const ICON_LIBRARY_GROUPS: IconLibraryGroup[] = (
  [
    {
      id: 'iconography-linear',
      family: 'linear',
      title: 'Linear',
      description: 'Stroke / outline icons from ALinear_* in @hieultra/icon.',
    },
    {
      id: 'iconography-bold',
      family: 'bold',
      title: 'Bold',
      description: 'Filled status icons from ABold_* in @hieultra/icon.',
    },
  ] as const
)
  .map((group) => ({
    ...group,
    entries: ICON_LIBRARY_ENTRIES.filter((entry) => entry.family === group.family),
  }))
  .filter((group) => group.entries.length > 0);

export const ICON_LIBRARY_SIZE_PREVIEWS: IconSizePreviewRow[] = (
  Object.keys(ICON_SIZE_PX) as IconSizeToken[]
).map((token) => ({
  token,
  alias: `iconsize/${token}`,
  px: ICON_SIZE_PX[token],
}));
