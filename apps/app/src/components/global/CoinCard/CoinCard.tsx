import { CoinType } from '@my-coin/database';
import { styled } from '@my-coin/ui';
import { CameraOffIcon } from '@my-coin/ui/dist/icons/CameraOff';
import Link from 'next/link';
import type { FC } from 'react';
import { Card } from '../Card';

const Left = styled('div', {
  display: 'flex',
  alignItems: 'center',
  columnGap: '$16',
});

const CoinImagesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '$8',
  backgroundColor: '$white',
  borderRadius: '$xl',
  columnGap: '$4',
});

const CoinImage = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '$64',
  width: '$64',
});

const InfosContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
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
}) => (
  <Link href={link}>
    <Card
      paddingHorizontal={{
        default: 16,
      }}
      paddingVertical={{
        default: 16,
      }}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: '$16',
      }}
      borderRadius="xl"
    >
      <Left>
        <CoinImagesContainer>
          <CoinImage>
            {observeImage ? (
              <img src={observeImage} alt="Obverse" width={40} />
            ) : (
              <CameraOffIcon size={40} colorName="gray" />
            )}
          </CoinImage>
          <CoinImage>
            {reverseImage ? (
              <img src={reverseImage} alt="Reverse" width={40} />
            ) : (
              <CameraOffIcon size={40} colorName="gray" />
            )}
          </CoinImage>
        </CoinImagesContainer>

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
      </Left>

      <Price>Prix ${price}</Price>
    </Card>
  </Link>
);
