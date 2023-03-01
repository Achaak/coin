import { FC } from 'react';
import { SearchCatalogsContainer } from './catalogs';
import { SearchCoinsRefsContainer } from './coinRef';
import { SearchUsersContainer } from './users';

export const SearchContainer: FC = () => (
  <>
    <SearchUsersContainer />
    <SearchCatalogsContainer />
    <SearchCoinsRefsContainer />
  </>
);
