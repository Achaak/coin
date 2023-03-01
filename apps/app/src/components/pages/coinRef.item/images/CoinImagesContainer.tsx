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
  padding: '$16',
  backgroundColor: '$white',
  borderRadius: '$3xl',
  height: '$256',
});

type CoinImagesContainerProps = {
  observeImage: string | null;
  obverseCreator: string | null;
  obverseDescription: string | null;
  reverseImage: string | null;
  reverseCreator: string | null;
  reverseDescription: string | null;
};

export const CoinImagesContainer: FC<CoinImagesContainerProps> = ({
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
      default: 24,
    }}
    rowGap={{
      default: 24,
    }}
  >
    <Card
      paddingHorizontal={{
        default: 32,
      }}
      paddingVertical={{
        default: 24,
      }}
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
      paddingHorizontal={{
        default: 32,
      }}
      paddingVertical={{
        default: 24,
      }}
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
