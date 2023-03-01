import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';
import { AppLayout } from '../components/layouts/app';
import { ContactsContainer } from '../components/pages/contacts';
import { globalNamespaces } from '../configs/globalNamespaces';

import type { NextPageWithLayout } from './_app';

const ContactsPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <ContactsContainer />
    </>
  );
};

ContactsPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

ContactsPage.namespaces = [...globalNamespaces];

export default ContactsPage;
