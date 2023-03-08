import type { Catalog } from '@prisma/client';

export const DEFAULT_CATALOGS = [
  {
    id: '1',
    name: 'European Union (Euro)',
    currency: 'Euro',
    periodId: '1',
  }, // Germany
  {
    id: '2',
    name: 'European Union (Euro)',
    currency: 'Euro',
    periodId: '2',
  }, // France
] as Catalog[];
