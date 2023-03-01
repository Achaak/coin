import type { FC } from 'react';

export type CoinExplorerProps = {
  userId: string;
};

export const CoinExplorer: FC<CoinExplorerProps> = ({ userId }) => (
  <>{userId}</>
);
