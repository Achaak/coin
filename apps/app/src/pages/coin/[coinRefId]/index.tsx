import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../../components/layouts/app';
import { CoinItemContainer } from '../../../components/pages/coin.item';
import { globalNamespaces } from '../../../configs/globalNamespaces';
import type { NextPageWithLayout } from '../../_app';

const CoinRefItemPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      <CoinItemContainer />
    </>
  );
};

CoinRefItemPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

CoinRefItemPage.namespaces = [...globalNamespaces];

export default CoinRefItemPage;
