import type { CoinRef } from '@prisma/client';
import { randFloat, randUser } from '@ngneat/falso';

export const euroValues = [
  {
    value: '1 cent',
    valueShort: '1c',
  },
  {
    value: '2 cents',
    valueShort: '2c',
  },
  {
    value: '5 cents',
    valueShort: '5c',
  },
  {
    value: '10 cents',
    valueShort: '10c',
  },
  {
    value: '20 cents',
    valueShort: '20c',
  },
  {
    value: '50 cents',
    valueShort: '50c',
  },
  {
    value: '1 euro',
    valueShort: '1€',
  },
  {
    value: '2 euros',
    valueShort: '2€',
  },
];

const generateEuroCoinRef = ({
  id,
  catalogId,
}: {
  id?: string;
  catalogId: string;
}): Array<Partial<CoinRef>> =>
  euroValues.map((value) => ({
    id: `${id}-${value.valueShort}`,
    catalogId,
    alignment: 'COIN',
    composition: 'COPPER-NICKEL',
    diameter: randFloat({ min: 20, max: 30, fraction: 2 }),
    demonetized: false,
    thickness: randFloat({ min: 1, max: 2, fraction: 2 }),
    weight: randFloat({ min: 3, max: 5, fraction: 2 }),
    shape: 'round',
    type: 'CIRCULATION',
    value: value.value,
    valueShort: value.valueShort,
    edgeDescription: 'Plain edge',
    edgeType: 'Plain',
    obverseCreator: `${randUser().firstName} ${randUser().lastName}`,
    obverseDescription: 'Portrait of the Queen',
    reverseCreator: `${randUser().firstName} ${randUser().lastName}`,
    reverseDescription: 'European Union',
  }));

export const DEFAULT_COINS_REF = [
  ...generateEuroCoinRef({ id: '1', catalogId: '1' }), // Germany
  ...generateEuroCoinRef({ id: '2', catalogId: '2' }), // France
] as Array<CoinRef>;
