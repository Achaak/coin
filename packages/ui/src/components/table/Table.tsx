import type { TableProps, Data, TableRef } from '@pikas-ui/table';
import { Table as TablePikasUI } from '@pikas-ui/table';
import { forwardRef, Ref } from 'react';

export type {
  TableProps,
  TableCSS,
  TableVariant,
  Accessor,
  AccessorAttributes,
  AccessorFn,
  AccessorOptions,
  FilterFn,
  OnChangeFn,
  RankItemOptions,
  Ranking,
  RankingInfo,
  TableColumnFiltersState,
  TableColumnOrder,
  TableColumnOrderState,
  TableColumnPinning,
  TableColumnPinningState,
  TableColumnResizeMode,
  TableColumnSizing,
  TableColumnSizingState,
  TableExpandedState,
  TableExpanding,
  TableFilters,
  TableGrouping,
  TableGroupingState,
  TablePadding,
  TablePaginationProps,
  TablePaginationState,
  TableRef,
  TableRowSelection,
  TableRowSelectionState,
  TableSorting,
  TableSortingState,
  TableVisibility,
  TableVisibilityState,
} from '@pikas-ui/table';
export {
  tableVariant,
  compareItems,
  rankItem,
  rankings,
} from '@pikas-ui/table';

const FRefInputTable = <T extends Data>(
  props: TableProps<T>,
  ref: Ref<TableRef<T>>
): JSX.Element => <TablePikasUI<T> ref={ref} variant="light" {...props} />;

export const Table = forwardRef(FRefInputTable) as <T extends Data>(
  props: TableProps<T> & { ref?: Ref<TableRef<T>> }
) => JSX.Element;
