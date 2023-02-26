import type { ProgressProps } from '@pikas-ui/progress';
import { Progress as ProgressPikasUI } from '@pikas-ui/progress';
import { FC } from 'react';

export type { ProgressProps } from '@pikas-ui/progress';

export const Progress: FC<ProgressProps> = (props) => (
  <ProgressPikasUI {...props} />
);
