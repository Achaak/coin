import type { DropdownMenuProps } from '@pikas-ui/dropdown-menu';
import { DropdownMenu as DropdownMenuPikasUI } from '@pikas-ui/dropdown-menu';
import { FC } from 'react';

export type {
  DropdownMenuData,
  DropdownMenuProps,
  DropdownMenuDataItemEntry,
  DropdownMenuDirection,
  DropdownMenuSide,
} from '@pikas-ui/dropdown-menu';
export {
  dropdownMenuAlign,
  dropdownMenuDirection,
  dropdownMenuSide,
} from '@pikas-ui/dropdown-menu';

export const DropdownMenu: FC<DropdownMenuProps> = (props) => (
  <DropdownMenuPikasUI {...props} />
);
