import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { AppLayout } from '../../../components/layouts/app';
import { UserCoinsContainer } from '../../../components/pages/user.coins';
import { globalNamespaces } from '../../../configs/globalNamespaces';
import { trpc } from '../../../utils/trpc';
import type { NextPageWithLayout } from '../../_app';

const UserCoinsPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const router = useRouter();
  const { userId } = router.query;

  const { data: userData, isLoading: userIsLoading } = trpc.user.byId.useQuery({
    id: userId as string,
  });

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      {!userIsLoading && userData && <UserCoinsContainer user={userData} />}
    </>
  );
};

UserCoinsPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

UserCoinsPage.namespaces = [...globalNamespaces];

export default UserCoinsPage;
