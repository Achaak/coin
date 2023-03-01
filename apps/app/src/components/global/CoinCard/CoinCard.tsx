import { CoinType } from '@my-coin/database';
import { PikasCSS, styled } from '@my-coin/ui';
import type { FC } from 'react';

const Container = styled('div', {
  backgroundColor: '$gray',
  borderRadius: '$3xl',
});

export type CoinProps = {
  css?: PikasCSS;
  year?: number;
  yearRange?: [number, number];
  country: {
    code: string;
    name: string;
  };
  denomination: string;
  composition: string;
  weight: number;
  diameter: number;
  type: CoinType;
  price?: number;
  observeImage?: string;
  reverseImage?: string;
};

export const CoinCard: FC<CoinProps> = ({ css }) => (
  <Container
    css={{
      ...css,
    }}
  ></Container>
);
