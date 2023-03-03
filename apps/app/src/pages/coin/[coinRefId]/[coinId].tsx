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

  const {
    data: coinData,
    isLoading: coinIsLoading,
    error: coinError,
  } = trpc.coin.byIdFull.useQuery({
    id: coinId as string,
  });

  if (coinData?.refId !== coinRefId && !coinIsLoading) {
    void router.push('/404');
  }

  if (coinError) {
    void router.push('/404');
  }

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {!coinIsLoading && coinData && <CoinItemContainer coin={coinData} />}
    </>
  );
};

CoinItemPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

CoinItemPage.namespaces = [...globalNamespaces];

export default CoinItemPage;
