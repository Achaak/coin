import type { ErrorDialogProps } from '@pikas-ui/dialog';
import { ErrorDialog as ErrorDialogPikasUI } from '@pikas-ui/dialog';
import { FC } from 'react';

export const ErrorDialog: FC<ErrorDialogProps> = (props) => (
  <ErrorDialogPikasUI {...props} />
);
