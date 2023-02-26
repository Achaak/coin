import type { SkeletonProps } from '@pikas-ui/skeleton';
import { Skeleton as SkeletonPikasUI } from '@pikas-ui/skeleton';
import { FC } from 'react';

export type { SkeletonProps } from '@pikas-ui/skeleton';

export const Skeleton: FC<SkeletonProps> = (props) => (
  <SkeletonPikasUI {...props} />
);
