import type { SwitchProps } from '@pikas-ui/switch';
import { Switch as SwitchPikasUI } from '@pikas-ui/switch';
import { FC } from 'react';

export type { SwitchProps, SwitchCSS } from '@pikas-ui/switch';

export const Switch: FC<SwitchProps> = (props) => <SwitchPikasUI {...props} />;
