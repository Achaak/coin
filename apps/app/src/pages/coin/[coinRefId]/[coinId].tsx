import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { AppLayout } from '../../../components/layouts/app';
import { globalNamespaces } from '../../../configs/globalNamespaces';
import { trpc } from '../../../utils/trpc';
import type { NextPageWithLayout } from '../../_app';
import { CoinItemContainer } from '../../../components/pages/coinRef.item/coin.item';

const CoinItemPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const router = useRouter();
  const { coinRefId, coinId } = router.query;

  const { data: coinRefData, isLoading: coinRefIsLoading } =
    trpc.coinRef.byIdFull.useQuery({
      id: coinRefId as string,
    });

  const { data: coinData, isLoading: coinIsLoading } = trpc.coin.byId.useQuery({
    id: coinId as string,
  });

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {!coinRefIsLoading && !coinIsLoading && coinData && coinRefData && (
        <CoinItemContainer coin={coinData} coinRef={coinRefData} />
      )}
    </>
  );
};

CoinItemPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

CoinItemPage.namespaces = [...globalNamespaces];

export default CoinItemPage;
