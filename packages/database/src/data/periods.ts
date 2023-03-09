import type { Period } from '@prisma/client';

export const DEFAULT_PERIODS = [
  {
    id: '1',
    flag: null,
    name: 'Germany',
    yearStart: 2002,
  },
  {
    id: '2',
    flag: null,
    name: 'France',
    yearStart: 1999,
  },
] as Period[];
