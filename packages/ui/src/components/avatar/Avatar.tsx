import type { AvatarProps } from '@pikas-ui/avatar';
import { Avatar as AvatarPikasUI } from '@pikas-ui/avatar';
import { FC } from 'react';

export type {
  AvatarProps,
  AvatarCSS,
  AvatarImageLoadingStatus,
} from '@pikas-ui/avatar';

export const Avatar: FC<AvatarProps> = (props) => <AvatarPikasUI {...props} />;
