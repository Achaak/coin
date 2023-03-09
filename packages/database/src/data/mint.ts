import type { Mint } from '@prisma/client';

export const DEFAULT_MINTS = [
  {
    id: '1',
    location: 'Pessac, France',
    name: 'Monnaie de Paris',
    yearStart: 1973,
  },
  {
    id: '2',
    location: 'Berlin, Germany',
    name: 'Staatliche Münze Berlin',
    yearStart: 1280,
  },
  {
    id: '3',
    location: 'Munich, Germany',
    name: 'Bayerisches Hauptmünzamt',
    yearStart: 1158,
  },
  {
    id: '4',
    location: 'Stuttgart, Allemagne',
    name: 'Staatliche Münze Baden-Württemberg',
    yearStart: 1374,
  },
  {
    id: '5',
    location: 'Karlsruhe, Allemagne',
    name: 'Staatliche Münze Baden-Württemberg',
    yearStart: 1827,
  },
  {
    id: '6',
    location: 'Hambourg, Allemagne',
    name: 'Hamburgische Münze',
    yearStart: 801,
  },
] as Mint[];
