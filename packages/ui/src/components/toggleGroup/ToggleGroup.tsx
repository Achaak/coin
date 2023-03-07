import type { ToggleGroupProps } from '@pikas-ui/toggle-group';
import { ToggleGroup as ToggleGroupPikasUI } from '@pikas-ui/toggle-group';
import { FC } from 'react';

export type { ToggleGroupProps };

export const ToggleGroup: FC<ToggleGroupProps> = ({ ...props }) => (
  <ToggleGroupPikasUI {...props} />
);
