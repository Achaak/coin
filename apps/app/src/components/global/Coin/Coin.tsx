import { PikasCSS, styled } from '@my-coin/ui';
import type { FC } from 'react';

const Container = styled('div', {
  backgroundColor: '$gray',
  borderRadius: '$3xl',
});

export type CoinProps = {
  css?: PikasCSS;
};

export const Coin: FC<CoinProps> = ({ css }) => (
  <Container
    css={{
      ...css,
    }}
  ></Container>
);
