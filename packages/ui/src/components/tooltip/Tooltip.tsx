import type { TooltipProps } from '@pikas-ui/tooltip';
import { Tooltip as TooltipPikasUI } from '@pikas-ui/tooltip';
import { FC } from 'react';

export { tooltipAlign, tooltipPadding, tooltipSide } from '@pikas-ui/tooltip';

export type {
  TooltipProps,
  TooltipCSS,
  TooltipAlign,
  TooltipPadding,
  TooltipSide,
} from '@pikas-ui/tooltip';

export const Tooltip: FC<TooltipProps> = (props) => (
  <TooltipPikasUI {...props} />
);
