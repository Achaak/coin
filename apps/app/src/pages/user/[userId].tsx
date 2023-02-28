import { useI18nContext } from '@my-coin/translate';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { AppLayout } from '../../components/layouts/app';
import { UserItemContainer } from '../../components/pages/user.item';
import { globalNamespaces } from '../../configs/globalNamespaces';
import { User } from '../../selector/user';
import { trpcProxy } from '../../utils/trpc';
import type { NextPageWithLayout } from '../_app';

const UserItemPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userRes = await trpcProxy.user.byId.query({
        id: userId as string,
      });

      if (userRes) {
        setUser(userRes);
      }
    };

    void getUser();
  }, [userId]);

  console.log(user);

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />
      <UserItemContainer user={user} />
    </>
  );
};

UserItemPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

UserItemPage.namespaces = [...globalNamespaces];

export default UserItemPage;
