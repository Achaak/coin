import { FC } from 'react';
import { Card } from '../../../global/Card';
import { Infos } from '../../../global/Infos';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { CoinAlignment } from '@my-coin/database';

type CoinInformationContainerProps = {
  composition: string | null;
  value: string;
  diameter: number | null;
  edgeType: string | null;
  edgeDescription: string | null;
  weight: number | null;
  thickness: number | null;
  type: string;
  shape: string | null;
  period: string;
  alignment: CoinAlignment | null;
};

export const CoinInformation: FC<CoinInformationContainerProps> = ({
  composition,
  value,
  diameter,
  edgeType,
  edgeDescription,
  weight,
  thickness,
  type,
  shape,
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
          label: 'Period',
          value: period,
        },
        ...(value
          ? [
              {
                label: 'Value',
                value: value,
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
