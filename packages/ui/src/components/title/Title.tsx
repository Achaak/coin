import type { TitleProps } from '@pikas-ui/title';
import { Title as TitlePikasUI } from '@pikas-ui/title';
import { FC } from 'react';

export type {
  TitleTextTransform,
  TitleAs,
  TitleVariant,
  TitleProps,
  TitleCSS,
} from '@pikas-ui/title';

export {
  textTransformComponent,
  titleComponent,
  titleVariant,
} from '@pikas-ui/title';

export const Title: FC<TitleProps> = (props) => (
  <TitlePikasUI
    {...props}
    css={{
      ...props.css,
      h1: {
        fontWeight: '$bold',
        ...props.css?.h1,
      },
      h2: {
        fontWeight: '$bold',
        fontSize: '$em-x-large',
        ...props.css?.h2,
      },
    }}
  />
);
