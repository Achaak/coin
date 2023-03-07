import { FC } from 'react';
import { Card } from '../../Card';
import { styled } from '@my-coin/ui';
import { CoinExplorerMenu } from '../Menu';
import { CoinExplorerCoin } from '../Coins';

const Container = styled('div', {
  display: 'flex',
  width: '100%',
  columnGap: '$24',
  alignItems: 'flex-start',
});

export const CoinExplorerLarge: FC = () => (
  <Container>
    <Card
      css={{
        width: 300,
      }}
    >
      <CoinExplorerMenu />
    </Card>
    <CoinExplorerCoin />
  </Container>
);
