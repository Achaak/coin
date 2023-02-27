import { CustomIcon, IconProps } from '@pikas-ui/icons';
import { FC } from 'react';

export const TransferIcon: FC<IconProps> = (props) => (
  <CustomIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m15 12l5-4l-5-4v2.999H2v2h13zm7 3H9v-3l-5 4l5 4v-3h13z"
      />
    </svg>
  </CustomIcon>
);
