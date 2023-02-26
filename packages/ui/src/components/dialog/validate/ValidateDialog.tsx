import type { ValidateDialogProps } from '@pikas-ui/dialog';
import { ValidateDialog as ValidateDialogPikasUI } from '@pikas-ui/dialog';
import { FC } from 'react';

export const ValidateDialog: FC<ValidateDialogProps> = (props) => (
  <ValidateDialogPikasUI {...props} />
);
