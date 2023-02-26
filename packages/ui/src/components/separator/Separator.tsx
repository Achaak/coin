import type { SeparatorProps } from '@pikas-ui/separator';
import { Separator as SeparatorPikasUI } from '@pikas-ui/separator';
import { FC } from 'react';

export type { SeparatorOrientation, SeparatorProps } from '@pikas-ui/separator';

export const Separator: FC<SeparatorProps> = (props) => (
  <SeparatorPikasUI size={props.size ?? 1} {...props} />
);
