import type { CheckboxProps } from '@pikas-ui/checkbox';
import { Checkbox as CheckboxPikasUI } from '@pikas-ui/checkbox';
import { FC } from 'react';

export type {
  CheckboxProps,
  CheckboxCSS,
  CheckboxSide,
} from '@pikas-ui/checkbox';
export { checkboxSide } from '@pikas-ui/checkbox';

export const Checkbox: FC<CheckboxProps> = (props) => (
  <CheckboxPikasUI {...props} />
);
