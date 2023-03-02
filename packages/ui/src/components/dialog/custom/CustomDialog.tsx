import type { CustomDialogProps } from '@pikas-ui/dialog';
import { CustomDialog as CustomDialogPikasUI } from '@pikas-ui/dialog';
import { FC } from 'react';

export type {
  CustomDialogCSS,
  CustomDialogPadding,
  CustomDialogGapElement,
  CustomDialogGap,
  CustomDialogPaddingElement,
  DialogProps,
} from '@pikas-ui/dialog';

export { DialogTitle } from '@pikas-ui/dialog';

export const CustomDialog: FC<CustomDialogProps> = (props) => (
  <CustomDialogPikasUI {...props} />
);
