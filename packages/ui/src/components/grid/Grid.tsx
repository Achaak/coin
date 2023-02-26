import type { GridProps } from '@pikas-ui/grid';
import { Grid as GridPikasUI } from '@pikas-ui/grid';
import { FC } from 'react';

export type { GridProps };

export const Grid: FC<GridProps> = ({ children, ...props }) => (
  <GridPikasUI {...props}>{children}</GridPikasUI>
);
