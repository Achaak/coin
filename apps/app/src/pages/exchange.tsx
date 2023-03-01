import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { ExchangeContainer } from '../components/pages/exchange';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const ExchangePage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <ExchangeContainer />
    </>
  );
};

ExchangePage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

ExchangePage.namespaces = [...globalNamespaces];

export default ExchangePage;
