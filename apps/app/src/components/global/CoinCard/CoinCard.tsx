import { CoinType } from '@my-coin/database';
import { styled } from '@my-coin/ui';
import Link from 'next/link';
import type { FC } from 'react';
import { Card, CardPaddingHorizontal, CardPaddingVertical } from '../Card';
import { CoinImages } from '../CoinImages';

const End = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'column',
  rowGap: '$8',

  '@sm': {
    columnGap: '$16',
    flexDirection: 'row',
  },
});

const InfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const Name = styled('span', {
  fontWeight: '$bold',
  color: '$black',
});

const Details = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
});

const DetailsItem = styled('li', {
  display: 'flex',
  color: '$gray-darker',
  fontSize: '$em-small',
});

const Price = styled('span', {
  fontWeight: '$bold',
  fontSize: '$em-large',
  color: '$primary',
});

export type CoinProps = {
  observeImage: string | null;
  reverseImage: string | null;
  denomination: string;
  composition: string | null;
  weight: number | null;
  diameter: number | null;
  type: CoinType;
  price: number | null;
  link: string;

  year?: number | null;
  yearRange?: [number, number];
  paddingHorizontal?: CardPaddingHorizontal;
  paddingVertical?: CardPaddingVertical;
};

export const CoinCard: FC<CoinProps> = ({
  observeImage,
  reverseImage,
  denomination,
  year,
  yearRange,
  composition,
  weight,
  diameter,
  type,
  price,
  link,
  paddingHorizontal = {
    default: 8,
    lg: 16,
  },
  paddingVertical = {
    default: 8,
    lg: 16,
  },
}) => (
  <Link href={link}>
    <Card
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      css={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: '$8',

        '@sm': {
          columnGap: '$16',
          flexDirection: 'row',
        },
      }}
      borderRadius={{
        default: 'xl',
      }}
    >
      <CoinImages observeImage={observeImage} reverseImage={reverseImage} />

      <End>
        <InfosContainer>
          <Name>
            {denomination}, {year ?? yearRange?.join('-')}
          </Name>
          <Details>
            <DetailsItem>{composition}</DetailsItem>
            <DetailsItem>
              {weight} {diameter}
            </DetailsItem>
            <DetailsItem>{type}</DetailsItem>
          </Details>
        </InfosContainer>

        <Price>Prix ${price}</Price>
      </End>
    </Card>
  </Link>
);
