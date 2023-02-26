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

export const TabsVertical = <T extends string>(
  props: TabsProps<T>
): JSX.Element => (
  <TabsPikasUI
    {...props}
    orientation="vertical"
    css={{
      ...props.css,
      triggerList: {
        borderBottom: '1px solid $gray',
        padding: 6,

        '&[aria-orientation="vertical"]': {
          columnGap: 0,
        },

        ...props.css?.triggerList,
      },
      trigger: {
        color: '$gray-light',
        boxShadow: 'none !important',
        padding: '4px 16px',
        fontWeight: '$medium',

        '&:not(:first-child)': {
          borderLeft: '1px solid $gray',
        },
        ...props.css?.trigger,
      },
    }}
  />
);

export const TabsHorizontal = <T extends string>(
  props: TabsProps<T>
): JSX.Element => (
  <TabsPikasUI
    {...props}
    orientation="horizontal"
    css={{
      ...props.css,
      triggerList: {
        borderRight: '1px solid $gray',
        padding: 6,

        '&[aria-orientation="vertical"]': {
          columnGap: 0,
        },

        ...props.css?.triggerList,
      },
      trigger: {
        color: '$gray-light',
        boxShadow: 'none !important',
        padding: '4px 16px',
        fontWeight: '$medium',

        '&:not(:first-child)': {
          borderTop: '1px solid $gray',
        },
        ...props.css?.trigger,
      },
    }}
  />
);
