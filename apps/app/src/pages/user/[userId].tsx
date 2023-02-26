import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { UserItemContainer } from '../../components/pages/user.item';
import { globalNamespaces } from '../../configs/globalNamespaces';
import type { NextPageWithLayout } from '../_app';

const UserItemPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      <UserItemContainer />
    </>
  );
};

UserItemPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

UserItemPage.namespaces = [...globalNamespaces];

export default UserItemPage;
