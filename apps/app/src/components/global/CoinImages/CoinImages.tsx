import { styled } from '@my-coin/ui';
import { CameraOffIcon } from '@my-coin/ui/dist/icons/CameraOff';
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
);
