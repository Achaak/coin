import { FC } from 'react';
import { Card } from '../../../global/Card';
import { Infos } from '../../../global/Infos';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { CoinAlignment } from '@my-coin/database';

type CoinInformationContainerProps = {
  composition: string | null;
  denomination: string;
  diameter: number | null;
  edgeType: string | null;
  edgeDescription: string | null;
  weight: number | null;
  thickness: number | null;
  type: string;
  shape: string | null;
  country: string;
  period: string | null;
  alignment: CoinAlignment | null;
};

export const CoinInformationContainer: FC<CoinInformationContainerProps> = ({
  composition,
  denomination,
  diameter,
  edgeType,
  edgeDescription,
  weight,
  thickness,
  type,
  shape,
  country,
  period,
  alignment,
}) => (
  <Card
    css={{
      rowGap: '$16',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Title as="h2">Information</Title>
    <Infos
      data={[
        {
          label: 'Reference',
          value: 'KM#123',
        },
        {
          label: 'Country',
          value: country,
        },
        ...(denomination
          ? [
              {
                label: 'Denomination',
                value: denomination,
              },
            ]
          : []),
        ...(period
          ? [
              {
                label: 'Period',
                value: period,
              },
            ]
          : []),
        {
          label: 'Type',
          value: type,
        },
        ...(composition
          ? [
              {
                label: 'Composition',
                value: composition,
              },
            ]
          : []),
        ...(edgeType
          ? [
              {
                label: 'Edge type',
                value: edgeType,
              },
            ]
          : []),
        ...(edgeDescription
          ? [
              {
                label: 'Edge description',
                value: edgeDescription,
              },
            ]
          : []),
        ...(shape
          ? [
              {
                label: 'Forme',
                value: shape,
              },
            ]
          : []),
        ...(alignment
          ? [
              {
                label: 'Alignment',
                value: alignment,
              },
            ]
          : []),
        ...(weight
          ? [
              {
                label: 'Weight',
                value: `${weight} g`,
              },
            ]
          : []),
        ...(diameter
          ? [
              {
                label: 'Diameter',
                value: `${diameter} mm`,
              },
            ]
          : []),
        ...(thickness
          ? [
              {
                label: 'Thickness',
                value: `${thickness} mm`,
              },
            ]
          : []),
      ]}
    />
  </Card>
);
