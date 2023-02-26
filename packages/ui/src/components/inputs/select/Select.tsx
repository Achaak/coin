import type { SelectProps } from '@pikas-ui/select';
import { Select as SelectPikasUI } from '@pikas-ui/select';
import { FC } from 'react';

export { selectDirections, selectPadding } from '@pikas-ui/select';

export type {
  SelectItem,
  SelectProps,
  SelectCSS,
  SelectDirections,
  SelectPadding,
  SelectData,
} from '@pikas-ui/select';

export const Select: FC<SelectProps> = (props) => (
  <SelectPikasUI borderRadius="full" boxShadow="none" {...props} />
);
