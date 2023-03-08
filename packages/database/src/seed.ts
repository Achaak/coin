/* eslint-disable no-console */
import { prisma } from '.';

import { DEFAULT_PERIODS } from './data/periods';
import { DEFAULT_CATALOGS } from './data/catalogs';
import { DEFAULT_COINS_REF } from './data/coinRef';
import { DEFAULT_COINS } from './data/coin';
import { DEFAULT_MINTS } from './data/mint';

const seed = async (): Promise<void> => {
  try {
    /* ----- DELETE ----- */
    /* COINS */
    await prisma.coin.deleteMany({}).then(() => {
      console.log(`Deleted all coins`);
    });

    /* COIN REFS */
    await prisma.coinRef.deleteMany({}).then(() => {
      console.log(`Deleted all coin refs`);
    });

    /* CATALOGS */
    await prisma.catalog.deleteMany({}).then(() => {
      console.log(`Deleted all catalogs`);
    });

    /* MINTS */
    await prisma.mint.deleteMany({}).then(() => {
      console.log(`Deleted all mints`);
    });

    /* PERIODS */
    await prisma.period.deleteMany({}).then(() => {
      console.log(`Deleted all periods`);
    });

    /* ----- ADD ----- */
    /* PERIODS */

    await prisma.period
      .createMany({
        data: DEFAULT_PERIODS,
      })
      .then(() => {
        console.log(`Created all periods`);
      });

    /* MINTS */
    await prisma.mint
      .createMany({
        data: DEFAULT_MINTS,
      })
      .then(() => {
        console.log(`Created all mints`);
      });

    /* CATALOGS */
    await prisma.catalog
      .createMany({
        data: DEFAULT_CATALOGS,
      })
      .then(() => {
        console.log(`Created all catalogs`);
      });

    /* COIN REFS */
    await prisma.coinRef
      .createMany({
        data: DEFAULT_COINS_REF,
      })
      .then(() => {
        console.log(`Created all coin refs`);
      });

    /* COINS */
    await prisma.coin
      .createMany({
        data: DEFAULT_COINS,
      })
      .then(() => {
        console.log(`Created all coins`);
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();
