import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { Textfield } from '@my-coin/ui/dist/components/inputs/textfield/index';
import { styled } from '@my-coin/ui/dist/core/pikas-ui/Styles';
import { signIn, useSession } from 'next-auth/react';
import { ReactNode, useState } from 'react';
import { useI18nContext } from '@my-coin/translate';
import { globalNamespaces } from '../configs/globalNamespaces';
import type { NextPageWithLayout } from './_app';
import { AppLayout } from '../components/layouts/app';
import { NextSeo } from 'next-seo';
import { Card } from '../components/global/Card';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { useRouter } from 'next/router';
import { getLink } from '@my-coin/router/dist/app';

const Form = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  rowGap: 8,
  width: '100%',
});

const LoginPage: NextPageWithLayout = () => {
  const { LL } = useI18nContext();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { status } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    await signIn('email', { email });
  };

  if (status === 'authenticated') {
    void router.push(getLink('home'));
    return null;
  }

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <Card
        css={{
          rowGap: '$16',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Title as="h2">Se connecter</Title>

        <Form>
          <Textfield
            type="email"
            id="email"
            name="email"
            label={LL.app_signIn.email.label()}
            borderRadius="md"
            placeholder={LL.app_signIn.email.placeholder()}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            textError={error ?? undefined}
          />
          <Button style={{ marginTop: 8 }} onClick={handleSignIn}>
            {LL.app_signIn.email.button()}
          </Button>
        </Form>
      </Card>
    </>
  );
};

LoginPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

LoginPage.namespaces = [...globalNamespaces, 'app_signIn'];

export default LoginPage;
