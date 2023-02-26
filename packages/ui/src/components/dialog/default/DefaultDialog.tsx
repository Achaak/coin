import type { DefaultDialogProps } from '@pikas-ui/dialog';
import { DefaultDialog as DefaultDialogPikasUI } from '@pikas-ui/dialog';
import { FC } from 'react';

export type { DefaultDialogProps } from '@pikas-ui/dialog';

export const DefaultDialog: FC<DefaultDialogProps> = (props) => (
  <DefaultDialogPikasUI {...props} />
);
