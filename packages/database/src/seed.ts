import { prisma } from '.';

import type { Catalog, Coin, CoinRef, Country } from '@prisma/client';

const DEFAULT_COUNTRIES = [
  {
    code: 'be',
    name: 'Belgium',
  },
  {
    code: 'nl',
    name: 'Netherlands',
  },
  {
    code: 'de',
    name: 'Germany',
  },
  {
    code: 'fr',
    name: 'France',
  },
  {
    code: 'gb',
    name: 'United Kingdom',
  },
] as Array<Partial<Country>>;

const DEFAULT_CATALOGS = [
  {
    name: 'European Union (Euro)',
    countryCode: 'fr',
    id: '1',
  },
  {
    name: 'European Union (Euro)',
    countryCode: 'de',
    id: '2',
  },
  {
    name: 'European Union (Euro)',
    countryCode: 'nl',
    id: '3',
  },
  {
    name: 'European Union (Euro)',
    countryCode: 'be',
    id: '4',
  },
] as Array<Partial<Catalog>>;

const DEFAULT_COINS_REF = [
  {
    id: '1',
    denomination: '2 euro',
    composition: 'Aluminium-bronze',
    edge: 'Reeded',
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
    denomination: '1 euro',
    composition: 'Aluminium-bronze',
    edge: 'Reeded',
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
      DEFAULT_COUNTRIES.map(async (country) =>
        prisma.country
          .upsert({
            where: {
              code: country.code!,
            },
            update: {
              ...country,
            },
            create: {
              code: country.code!,
              name: country.name!,
            },
          })
          .then((u) => {
            // eslint-disable-next-line no-console
            console.log(`Created country: ${u.name ?? u.code}`);
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
              countryCode: catalog.countryCode!,
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
              denomination: coinRef.denomination!,
              composition: coinRef.composition!,
              edge: coinRef.edge!,
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
            console.log(`Created coin ref: ${u.denomination}`);
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
