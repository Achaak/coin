import { CustomIcon, IconProps } from '@pikas-ui/icons';
import { FC } from 'react';

export const MenuIcon: FC<IconProps> = (props) => (
  <CustomIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
    </svg>
  </CustomIcon>
);
