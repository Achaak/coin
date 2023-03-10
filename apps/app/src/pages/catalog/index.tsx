import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { CatalogContainer } from '../../components/pages/catalog';
import { globalNamespaces } from '../../configs/globalNamespaces';
import type { NextPageWithLayout } from '../_app';

const CatalogPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      <CatalogContainer />
    </>
  );
};

CatalogPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

CatalogPage.namespaces = [...globalNamespaces];

export default CatalogPage;
