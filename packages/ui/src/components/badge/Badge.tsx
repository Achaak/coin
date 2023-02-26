import type {
  BadgeIconProps,
  BadgeProps,
  CustomBadgeProps,
} from '@pikas-ui/badge';
import {
  Badge as BadgePikasUI,
  CustomBadge as CustomBadgePikasUI,
  BadgeIcon as BadgeIconPikasUI,
} from '@pikas-ui/badge';
import { FC } from 'react';

export type {
  BadgeProps,
  BadgeGap,
  BadgeIconProps,
  CustomBadgeProps,
} from '@pikas-ui/badge';

export { gapPadding } from '@pikas-ui/badge';

export const Badge: FC<BadgeProps> = (props) => <BadgePikasUI {...props} />;

export const CustomBadge: FC<CustomBadgeProps> = (props) => (
  <CustomBadgePikasUI {...props} />
);

export const BadgeIcon: FC<BadgeIconProps> = (props) => (
  <BadgeIconPikasUI {...props} />
);
