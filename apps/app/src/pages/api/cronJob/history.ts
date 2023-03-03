import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@my-coin/database';
import { env } from '../../../env/server.mjs';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { CRON_JOB_KEY } = env;
  const CRON_JOB_KEY_REQ = req.headers.authorization?.split(' ')[1];

  try {
    if (CRON_JOB_KEY === CRON_JOB_KEY_REQ) {
      const userRes = await prisma.user.count();
      // Process the POST request
      res.status(200).json(userRes);
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(500);
  }
};

export default handler;
