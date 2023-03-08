import { prisma } from '.';

import type { Catalog, Coin, CoinRef, Period } from '@prisma/client';

const DEFAULT_PERIODS = [
  {
    code: 'be',
    name: 'Belgium',
    yearFrom: 1830,
  },
  {
    code: 'nl',
    name: 'Netherlands',
    yearFrom: 1581,
  },
  {
    code: 'de',
    name: 'Germany',
    yearFrom: 1871,
  },
  {
    code: 'fr',
    name: 'France',
    yearFrom: 843,
  },
  {
    code: 'gb',
    name: 'United Kingdom',
    yearFrom: 1707,
  },
] as Array<Partial<Period>>;

const DEFAULT_CATALOGS = [
  {
    name: 'European Union (Euro)',
    currency: 'Euro',
    periodCode: 'fr',
    id: '1',
  },
  {
    name: 'European Union (Euro)',
    currency: 'Euro',
    periodCode: 'de',
    id: '2',
  },
  {
    name: 'European Union (Euro)',
    currency: 'Euro',
    periodCode: 'nl',
    id: '3',
  },
  {
    name: 'European Union (Euro)',
    currency: 'Euro',
    periodCode: 'be',
    id: '4',
  },
] as Array<Partial<Catalog>>;

const DEFAULT_COINS_REF = [
  {
    id: '1',
    value: '2 euro',
    valueShort: '2€',
    demonetized: false,
    composition: 'Aluminium-bronze',
    alignment: 'COIN',
    edgeDescription: 'Reeded edge',
    edgeType: 'Reeded',
    diameter: 25.75,
    type: 'COMMEMORATIVE',
    weight: 8.5,
    thickness: 1.85,
    shape: 'Round',
    obverseCreator: 'Luc Luycx',
    obverseDescription: 'Portrait of Queen Beatrix',
    reverseCreator: 'Luc Luycx',
    reverseDescription: 'European Union',
    catalogId: '1',
  },
  {
    id: '2',
    value: '1 euro',
    valueShort: '1€',
    demonetized: false,
    composition: 'Aluminium-bronze',
    alignment: 'COIN',
    edgeDescription: 'Reeded edge',
    edgeType: 'Reeded',
    diameter: 23.25,
    type: 'COMMEMORATIVE',
    weight: 7.5,
    thickness: 1.85,
    shape: 'Round',
    obverseCreator: 'Luc Luycx',
    obverseDescription: 'Portrait of Queen Beatrix',
    reverseCreator: 'Luc Luycx',
    reverseDescription: 'European Union',
    catalogId: '2',
  },
] as Array<Partial<CoinRef>>;

const DEFAULT_COINS = [
  {
    id: '1',
    year: 2002,
    mintageQtyBU: 1000000,
    mintageQtyPRF: 100000,
    mintageQtyUNC: 1000000,
    refId: '1',
    mintLocation: 'Brussels',
  },
  {
    id: '2',
    year: 2005,
    mintageQtyBU: 1000000,
    mintageQtyPRF: 100000,
    mintageQtyUNC: 1000000,
    refId: '1',
  },
  {
    id: '3',
    year: 2006,
    mintageQtyBU: 1000000,
    mintageQtyPRF: 100000,
    mintageQtyUNC: 1000000,
    refId: '2',
    mintMark: 'B',
  },
  {
    id: '4',
    year: 2007,
    mintageQtyBU: 1000000,
    mintageQtyPRF: 100000,
    mintageQtyUNC: 1000000,
    refId: '3',
  },
] as Array<Partial<Coin>>;

const seed = async (): Promise<void> => {
  try {
    await Promise.all(
      DEFAULT_PERIODS.map(async (period) =>
        prisma.period
          .upsert({
            where: {
              code: period.code!,
            },
            update: {
              ...period,
            },
            create: {
              code: period.code!,
              name: period.name!,
              yearFrom: period.yearFrom!,
              yearTo: period.yearTo ?? null,
            },
          })
          .then((u) => {
            // eslint-disable-next-line no-console
            console.log(`Created period: ${u.name ?? u.code}`);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          })
      )
    );

    await Promise.all(
      DEFAULT_CATALOGS.map(async (catalog) =>
        prisma.catalog
          .upsert({
            where: {
              id: catalog.id!,
            },
            update: {
              ...catalog,
            },
            create: {
              id: catalog.id!,
              name: catalog.name!,
              periodCode: catalog.periodCode!,
              currency: catalog.currency!,
            },
          })
          .then((u) => {
            // eslint-disable-next-line no-console
            console.log(`Created catalog: ${u.name}`);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          })
      )
    );

    await Promise.all(
      DEFAULT_COINS_REF.map(async (coinRef) =>
        prisma.coinRef
          .upsert({
            where: {
              id: coinRef.id!,
            },
            update: {
              ...coinRef,
            },
            create: {
              id: coinRef.id!,
              value: coinRef.value!,
              valueShort: coinRef.valueShort!,
              demonetized: coinRef.demonetized!,
              composition: coinRef.composition!,
              alignment: coinRef.alignment!,
              edgeDescription: coinRef.edgeDescription!,
              edgeType: coinRef.edgeType!,
              diameter: coinRef.diameter!,
              type: coinRef.type!,
              weight: coinRef.weight!,
              thickness: coinRef.thickness!,
              shape: coinRef.shape!,
              obverseCreator: coinRef.obverseCreator!,
              obverseDescription: coinRef.obverseDescription!,
              reverseCreator: coinRef.reverseCreator!,
              reverseDescription: coinRef.reverseDescription!,
              catalogId: coinRef.catalogId!,
            },
          })
          .then((u) => {
            // eslint-disable-next-line no-console
            console.log(`Created coin ref: ${u.value}`);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          })
      )
    );

    await Promise.all(
      DEFAULT_COINS.map(async (coin) =>
        prisma.coin
          .upsert({
            where: {
              id: coin.id!,
            },
            update: {
              ...coin,
            },
            create: {
              id: coin.id!,
              year: coin.year!,
              mintageQtyBU: coin.mintageQtyBU!,
              mintageQtyPRF: coin.mintageQtyPRF!,
              mintageQtyUNC: coin.mintageQtyUNC!,
              refId: coin.refId!,
              mintLocation: coin.mintLocation ?? null,
              mintMark: coin.mintMark ?? null,
            },
          })
          .then((u) => {
            // eslint-disable-next-line no-console
            console.log(`Created coin: ${u.year}`);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          })
      )
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();
