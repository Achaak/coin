import { useRouter } from 'next/router';
import { FC } from 'react';
import { trpc } from '../../../utils/trpc';
import { SearchCatalogsContainer } from './catalogs';
import { SearchCoinsRefsContainer } from './coinRef';
import { SearchUsersContainer } from './users';

export const SearchContainer: FC = () => {
  const router = useRouter();
  const { q } = router.query;

  const { data: usersData } = trpc.user.search.useQuery({
    query: q as string,
  });

  const { data: coinsRefsData } = trpc.coinRef.search.useQuery({
    query: q as string,
  });

  const { data: catalogsData } = trpc.catalog.search.useQuery({
    query: q as string,
  });

  return (
    <>
      {!!usersData?.length && <SearchUsersContainer users={usersData} />}
      {!!catalogsData?.length && (
        <SearchCatalogsContainer catalogs={catalogsData} />
      )}
      {!!coinsRefsData?.length && (
        <SearchCoinsRefsContainer coinsRefs={coinsRefsData} />
      )}
    </>
  );
};
