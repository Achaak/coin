import type { TabsProps } from '@pikas-ui/tabs';
import { Tabs as TabsPikasUI } from '@pikas-ui/tabs';

export type {
  TabsProps,
  TabsActivationMode,
  TabsAlignmentTrigger,
  TabsDirection,
  TabsCSS,
  TabsOrientation,
  TabsPadding,
} from '@pikas-ui/tabs';

export const Tabs = <T extends string>(props: TabsProps<T>): JSX.Element => (
  <TabsPikasUI {...props} />
);
