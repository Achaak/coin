import type { SearchbarProps } from '@pikas-ui/searchbar';
import { Searchbar as SearchbarPikasUI } from '@pikas-ui/searchbar';

export { searchbarDirection } from '@pikas-ui/searchbar';

export type {
  SearchbarProps,
  SearchbarCSS,
  ResultGroup,
  ResultItem,
  SearchbarDirection,
} from '@pikas-ui/searchbar';

export const Searchbar = <T,>(props: SearchbarProps<T>) => (
  <SearchbarPikasUI
    {...props}
    textfield={{
      boxShadow: 'none',
      borderRadius: 'full',
      backgroundColorName: 'gray',
      ...props.textfield,
    }}
    searchType="textfield"
  />
);
