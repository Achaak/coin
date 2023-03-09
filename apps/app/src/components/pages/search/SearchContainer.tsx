import { useRouter } from 'next/router';
import { FC } from 'react';
import { trpc } from '../../../utils/trpc';
import { SearchCatalogsContainer } from './catalogs';
import { SearchCoinRefsContainer } from './coinRef';
import { SearchUsersContainer } from './users';

export const SearchContainer: FC = () => {
  const router = useRouter();
  const { q } = router.query;

  const { data: usersData, isLoading: usersLoading } =
    trpc.user.search.useQuery({
      query: q as string,
    });

  const { data: coinRefsData, isLoading: coinRefsLoading } =
    trpc.coinRef.search.useQuery({
      query: q as string,
    });

  const { data: catalogsData, isLoading: catalogsLoading } =
    trpc.catalog.search.useQuery({
      query: q as string,
    });

  if (
    usersData?.length === 0 &&
    catalogsData?.length === 0 &&
    coinRefsData?.length === 0
  ) {
    return <div>Nothing found</div>;
  }

  if (usersLoading || catalogsLoading || coinRefsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!!usersData?.length && <SearchUsersContainer users={usersData} />}
      {!!catalogsData?.length && (
        <SearchCatalogsContainer catalogs={catalogsData} />
      )}
      {!!coinRefsData?.length && (
        <SearchCoinRefsContainer coinRefs={coinRefsData} />
      )}
    </>
  );
};
