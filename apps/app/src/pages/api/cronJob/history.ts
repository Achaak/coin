import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@my-coin/database';
import { env } from '../../../env/server.mjs';

const saveCoinPriceHistory = async () => {
  const coinsPriceAvg = await prisma.userCoin.groupBy({
    by: ['coinId'],
    _avg: {
      price: true,
    },
  });

  const coinsPriceHistory = coinsPriceAvg.map((coinPriceAvg) => ({
    coinId: coinPriceAvg.coinId,
    price: coinPriceAvg._avg.price,
  }));
  await prisma.coinPriceHistory.createMany({
    data: coinsPriceHistory
      .filter((coinPriceHistory) => coinPriceHistory.price !== null)
      .map((coinPriceHistory) => ({
        coinId: coinPriceHistory.coinId,
        price: coinPriceHistory.price!,
      })),
  });
};

const saveCoinRefPriceHistory = async () => {
  const coinRefsPriceAvg = await prisma.coinRef.findMany({
    select: {
      id: true,
      coins: {
        select: {
          usersCoin: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  const coinRefsPriceHistory = coinRefsPriceAvg.map((coinRefPriceAvg) => ({
    coinRefId: coinRefPriceAvg.id,
    sum: coinRefPriceAvg.coins.reduce(
      (acc, coin) =>
        acc +
        coin.usersCoin.reduce(
          (acc2, userCoin) => acc2 + (userCoin.price ?? 0),
          0
        ),
      0
    ),
    count: coinRefPriceAvg.coins.reduce(
      (acc, coin) => acc + coin.usersCoin.length,
      0
    ),
  }));

  await prisma.coinRefPriceHistory.createMany({
    data: coinRefsPriceHistory.map((coinRefPriceHistory) => ({
      coinRefId: coinRefPriceHistory.coinRefId,
      price: coinRefPriceHistory.sum / coinRefPriceHistory.count,
    })),
  });
};

const saveUserCoinsPriceHistory = async () => {
  const userCoinsCount = await prisma.userCoin.groupBy({
    by: ['userId', 'coinId'],
    _count: {
      id: true,
    },
  });

  const users = userCoinsCount.reduce<
    Array<{
      userId: string;
      coins: Array<{
        coinId: string;
        count: number;
      }>;
    }>
  >((acc, userCoinPriceAvg) => {
    const user = acc.find((u) => u.userId === userCoinPriceAvg.userId);
    if (user) {
      user.coins.push({
        coinId: userCoinPriceAvg.coinId,
        count: userCoinPriceAvg._count.id,
      });
    } else {
      acc.push({
        userId: userCoinPriceAvg.userId,
        coins: [
          {
            coinId: userCoinPriceAvg.coinId,
            count: userCoinPriceAvg._count.id,
          },
        ],
      });
    }
    return acc;
  }, []);

  const coinIds = userCoinsCount
    .map((userCoinPriceAvg) => userCoinPriceAvg.coinId)
    .filter((coinId, index, self) => self.indexOf(coinId) === index);

  const coinPriceHistory = await prisma.coinPriceHistory.findMany({
    where: {
      coinId: {
        in: coinIds,
      },
    },
    select: {
      coinId: true,
      price: true,
    },
  });

  const userCoinsPriceHistory = users.map((user) => ({
    userId: user.userId,
    total: user.coins.reduce(
      (acc, coin) =>
        acc +
        coinPriceHistory
          .filter((cph) => cph.coinId === coin.coinId)
          .reduce((acc2, cph) => acc2 + cph.price * coin.count, 0),
      0
    ),
  }));

  await prisma.userCoinsPriceHistory.createMany({
    data: userCoinsPriceHistory.map((ucph) => ({
      userId: ucph.userId,
      price: ucph.total,
    })),
  });
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { CRON_JOB_KEY } = env;
  const CRON_JOB_KEY_REQ = req.headers.authorization?.split(' ')[1];

  try {
    if (CRON_JOB_KEY === CRON_JOB_KEY_REQ) {
      await Promise.all([
        // Save coin price history
        saveCoinPriceHistory(),

        // Save coin ref price history
        saveCoinRefPriceHistory(),
      ]);

      // Save user coins price history
      await saveUserCoinsPriceHistory();

      // Process the POST request
      res.status(200).json('OK');
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(500);
  }
};

export default handler;
