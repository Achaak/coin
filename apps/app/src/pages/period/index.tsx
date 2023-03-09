import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { globalNamespaces } from '../../configs/globalNamespaces';
import type { NextPageWithLayout } from '../_app';

const PeriodPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
    </>
  );
};

PeriodPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

PeriodPage.namespaces = [...globalNamespaces];

export default PeriodPage;
