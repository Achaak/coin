import type { AlertProps } from '@pikas-ui/alert';
import { Alert as AlertPikasUI } from '@pikas-ui/alert';
import { FC } from 'react';

export type { AlertProps };

export const Alert: FC<AlertProps> = ({ variant, children }) => (
  <AlertPikasUI variant={variant}>{children}</AlertPikasUI>
);

Alert.defaultProps = {
  variant: 'danger',
};
