import { styled } from '@my-coin/ui';
import { FC } from 'react';
import { Card } from '../../../global/Card';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { CameraOffIcon } from '@my-coin/ui/dist/icons/CameraOff';
import { Infos } from '../../../global/Infos';

const CoinImageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$8',
  backgroundColor: '$white',
  borderRadius: '$xl',
  height: '$256',

  '@xl': {
    padding: '$16',
    borderRadius: '$2xl',
  },
});

type CoinImagesProps = {
  observeImage: string | null;
  obverseCreator: string | null;
  obverseDescription: string | null;
  reverseImage: string | null;
  reverseCreator: string | null;
  reverseDescription: string | null;
};

export const CoinImages: FC<CoinImagesProps> = ({
  observeImage,
  obverseCreator,
  obverseDescription,
  reverseImage,
  reverseCreator,
  reverseDescription,
}) => (
  <Grid
    type="container"
    cols={{
      default: 1,
      md: 2,
      xl: 1,
      '2xl': 2,
    }}
    columnGap={{
      default: 16,
      xl: 24,
    }}
    rowGap={{
      default: 16,
      xl: 24,
    }}
  >
    <Card
      css={{
        rowGap: '$16',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CoinImageContainer>
        {observeImage ? (
          <img src={observeImage} alt="Obverse" />
        ) : (
          <CameraOffIcon size={80} colorName="gray" />
        )}
      </CoinImageContainer>
      <Infos
        data={[
          ...(obverseCreator
            ? [
                {
                  label: 'Creator',
                  value: obverseCreator,
                },
              ]
            : []),
          ...(obverseDescription
            ? [
                {
                  label: 'Description',
                  value: obverseDescription,
                },
              ]
            : []),
        ]}
      />
    </Card>
    <Card
      css={{
        rowGap: '$16',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CoinImageContainer>
        {reverseImage ? (
          <img src={reverseImage} alt="Reverse" />
        ) : (
          <CameraOffIcon size={80} colorName="gray" />
        )}
      </CoinImageContainer>
      <Infos
        data={[
          ...(reverseCreator
            ? [
                {
                  label: 'Creator',
                  value: reverseCreator,
                },
              ]
            : []),
          ...(reverseDescription
            ? [
                {
                  label: 'Description',
                  value: reverseDescription,
                },
              ]
            : []),
        ]}
      />
    </Card>
  </Grid>
);
