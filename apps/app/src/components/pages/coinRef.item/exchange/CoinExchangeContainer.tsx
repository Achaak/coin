import { FC } from 'react';
import { Card } from '../../../global/Card';
import { Title } from '@my-coin/ui/dist/components/title/index';

export const CoinExchangeContainer: FC = () => (
  <Card
    paddingHorizontal={{
      default: 32,
    }}
    paddingVertical={{
      default: 24,
    }}
  >
    <Title as="h2">Exchange</Title>
  </Card>
);
