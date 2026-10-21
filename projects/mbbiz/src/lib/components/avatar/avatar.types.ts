export type MbbizAvatarShape = 'circle' | 'square';
export type MbbizAvatarSize = 'large' | 'default' | 'small' | number;

export const MBBIZ_AVATAR_SIZE_PX = {
  large: 64,
  default: 50,
  small: 32,
} as const;
