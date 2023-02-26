import { CustomIcon, IconProps } from '@pikas-ui/icons';
import { FC } from 'react';

export const LogInIcon: FC<IconProps> = (props) => (
  <CustomIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="m13 16l5-4l-5-4v3H4v2h9z" />
      <path
        fill="currentColor"
        d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
      />
    </svg>
  </CustomIcon>
);