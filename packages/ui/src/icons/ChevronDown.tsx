import { CustomIcon, IconProps } from '@pikas-ui/icons';
import { FC } from 'react';

export const ChevronDownIcon: FC<IconProps> = (props) => (
  <CustomIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.293 9.293L12 13.586L7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"
      />
    </svg>
  </CustomIcon>
);
