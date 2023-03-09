import { styled } from '@my-coin/ui';
import { CameraOffIcon } from '@my-coin/ui/dist/icons/CameraOff';
import Image from 'next/image';
import type { FC } from 'react';

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

export type CoinProps = {
  observeImage: string | null;
  reverseImage: string | null;
};

export const CoinImages: FC<CoinProps> = ({ observeImage, reverseImage }) => (
  <CoinImagesContainer>
    <CoinImage>
      {observeImage ? (
        <Image
          src={observeImage}
          alt="Obverse"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      ) : (
        <CameraOffIcon size={40} colorName="gray" />
      )}
    </CoinImage>
    <CoinImage>
      {reverseImage ? (
        <Image
          src={reverseImage}
          alt="Reverse"
          fill
          style={{
            objectFit: 'contain',
          }}
        />
      ) : (
        <CameraOffIcon size={40} colorName="gray" />
      )}
    </CoinImage>
  </CoinImagesContainer>
);
