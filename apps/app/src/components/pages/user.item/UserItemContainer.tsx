import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { CoinIcon } from '@my-coin/ui/dist/icons/Coin';
import Link from 'next/link';
import { FC } from 'react';
import { User } from '../../../selector/user';
import { getYearRange } from '../../../utils/coin';
import { trpc } from '../../../utils/trpc';
import { Card } from '../../global/Card';
import { CardStat } from '../../global/CardStat';
import { CoinCard } from '../../global/CoinCard';
import { UserHeader } from '../../global/UserHeader';

const SeeAll = styled('span', {
  color: '$gray-darker',
  fontWeight: '$medium',
  fontSize: '$em-large',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: '$primary',
  },
});

const numberFormat = new Intl.NumberFormat();

type UserItemContainerProps = {
  user: User;
};

export const UserItemContainer: FC<UserItemContainerProps> = ({ user }) => {
  const { data: coinCountByUserIdData, isLoading: coinCountByUserIdIsLoading } =
    trpc.userCoin.countByUserId.useQuery({
      userId: user.id,
    });
  const {
    data: catalogCountByUserIdData,
    isLoading: catalogCountByUserIdIsLoading,
  } = trpc.catalog.countByUserId.useQuery({
    userId: user.id,
  });
  const {
    data: catalogCountCountryByUserIdData,
    isLoading: catalogCountCountryByUserIdIsLoading,
  } = trpc.catalog.countCountryByUserId.useQuery({
    userId: user.id,
  });
  const {
    data: lastCoinsByUserIdData,
    // isLoading: lastCoinsByUserIdIsLoading, TODO
  } = trpc.userCoin.getLastByUserId.useQuery({
    userId: user.id,
  });

  return (
    <>
      <UserHeader image={user.image} name={user.name} id={user.id} />
      <Grid
        type="container"
        cols={{
          default: 1,
          lg: 2,
          '2xl': 4,
        }}
        columnGap={{
          default: 16,
          xl: 24,
        }}
        rowGap={{
          default: 16,
          xl: 24,
        }}
      >
        <CardStat
          Icon={CoinIcon}
          label="Coins"
          value={
            coinCountByUserIdData !== undefined
              ? numberFormat.format(coinCountByUserIdData)
              : undefined
          }
          loading={coinCountByUserIdIsLoading}
          right={
            <Link
              href={getLink('user.coins', {
                queries: {
                  userId: user.id,
                },
              })}
            >
              <SeeAll>See all</SeeAll>
            </Link>
          }
        />
        <CardStat Icon={CoinIcon} label="Rank" value={'#1'} />
        <CardStat
          Icon={CoinIcon}
          label="Pays"
          value={
            catalogCountCountryByUserIdData !== undefined
              ? numberFormat.format(catalogCountCountryByUserIdData)
              : undefined
          }
          loading={catalogCountCountryByUserIdIsLoading}
        />
        <CardStat
          Icon={CoinIcon}
          label="Catalogue"
          value={
            catalogCountByUserIdData !== undefined
              ? numberFormat.format(catalogCountByUserIdData)
              : undefined
          }
          loading={catalogCountByUserIdIsLoading}
        />
      </Grid>
      <Card
        css={{
          rowGap: '$16',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Title as="h2">Last coin</Title>
        {lastCoinsByUserIdData?.map((userCoin) => (
          <CoinCard
            paddingHorizontal={{
              default: 0,
            }}
            paddingVertical={{
              default: 0,
            }}
            key={userCoin.id}
            composition={userCoin.coin.ref.composition}
            year={userCoin.coin.year}
            denomination={userCoin.coin.ref.denomination}
            diameter={userCoin.coin.ref.diameter}
            weight={userCoin.coin.ref.weight}
            observeImage={
              userCoin.observeImage ?? userCoin.coin.ref.observeImage
            }
            reverseImage={
              userCoin.reverseImage ?? userCoin.coin.ref.reverseImage
            }
            price={userCoin.price}
            type={userCoin.coin.ref.type}
            yearRange={getYearRange(userCoin.coin.ref.coins)}
            link={getLink('coin.item', {
              queries: {
                coinId: userCoin.coin.id,
                coinRefId: userCoin.coin.ref.id,
              },
            })}
          />
        ))}
      </Card>
      <Card
        css={{
          rowGap: '$16',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Title as="h2">Echange</Title>
      </Card>
    </>
  );
};
