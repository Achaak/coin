import { FC } from 'react';
import { Card } from '../../../global/Card';
import { Infos } from '../../../global/Infos';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { getCoinRarity, getURS } from '../../../../utils/coinRarity';

type CoinStatisticsContainerProps = {
  usersHasIt: number;
  usersHasItLoading?: boolean;
  usersWishingIt: number;
  usersWishingItLoading?: boolean;
  rarity: number;
  rarityLoading?: boolean;
  mintage: number;
  rarityUrsLoading?: boolean;
};

export const CoinStatisticsContainer: FC<CoinStatisticsContainerProps> = ({
  usersHasIt,
  usersHasItLoading,
  usersWishingIt,
  usersWishingItLoading,
  rarity,
  rarityLoading,
  mintage,
  rarityUrsLoading,
}) => (
  <Card
    css={{
      rowGap: '$16',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Title as="h2">Statistics</Title>
    <Infos
      data={[
        {
          label: 'Users has it',
          value: usersHasIt,
          loading: usersHasItLoading,
        },
        {
          label: 'Users wishing it',
          value: usersWishingIt,
          loading: usersWishingItLoading,
        },
        {
          label: 'Rarity my coin',
          value: rarity
            ? `${getCoinRarity(rarity * 100)} (${rarity * 100})`
            : '',
          loading: rarityLoading,
        },
        {
          label: 'Rarity URS',
          value: getURS(mintage),
          loading: rarityUrsLoading,
        },
      ]}
    />
  </Card>
);
