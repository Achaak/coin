import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { AppLayout } from '../../../components/layouts/app';
import { CoinRefItemContainer } from '../../../components/pages/coinRef.item';
import { globalNamespaces } from '../../../configs/globalNamespaces';
import { trpc } from '../../../utils/trpc';
import type { NextPageWithLayout } from '../../_app';

const CoinRefItemPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const router = useRouter();
  const { coinRefId } = router.query;

  const { data: coinRefData, isLoading: coinRefIsLoading } =
    trpc.coinRef.byIdFull.useQuery(
      {
        id: coinRefId as string,
      },
      {
        enabled: !!coinRefId,
      }
    );

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {!coinRefIsLoading && coinRefData && (
        <CoinRefItemContainer coinRef={coinRefData} />
      )}
    </>
  );
};

CoinRefItemPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

CoinRefItemPage.namespaces = [...globalNamespaces];

export default CoinRefItemPage;
