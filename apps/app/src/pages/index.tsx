import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { HomeContainer } from '../components/pages/home';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <HomeContainer />
    </>
  );
};

HomePage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

HomePage.namespaces = [...globalNamespaces];

export default HomePage;
