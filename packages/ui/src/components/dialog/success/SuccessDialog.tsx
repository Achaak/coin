import type { SuccessDialogProps } from '@pikas-ui/dialog';
import { SuccessDialog as SuccessDialogPikasUI } from '@pikas-ui/dialog';
import { FC } from 'react';

export const SuccessDialog: FC<SuccessDialogProps> = (props) => (
  <SuccessDialogPikasUI {...props} />
);
