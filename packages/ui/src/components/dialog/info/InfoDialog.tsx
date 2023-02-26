import type { InfoDialogProps } from '@pikas-ui/dialog';
import { InfoDialog as InfoDialogPikasUI } from '@pikas-ui/dialog';
import { FC } from 'react';

export const InfoDialog: FC<InfoDialogProps> = (props) => (
  <InfoDialogPikasUI {...props} />
);
