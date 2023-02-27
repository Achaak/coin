import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { Textfield } from '@my-coin/ui/dist/components/inputs/textfield/index';
import { styled } from '@my-coin/ui/dist/core/pikas-ui/Styles';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  LiteralUnion,
} from 'next-auth/react';
import { ReactNode } from 'react';
import { useI18nContext } from '@my-coin/translate';
import { globalNamespaces } from '../configs/globalNamespaces';
import type { NextPageWithLayout } from './_app';
import { BuiltInProviderType } from 'next-auth/providers';
import { AppLayout } from '../components/layouts/app';
import { NextSeo } from 'next-seo';

const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: '$white',
  padding: 32,
  br: 'lg',
  customRowGap: 8,
  width: '100%',
});

const Form = styled('form', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const LoginPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ providers, csrfToken }) => {
  const { LL } = useI18nContext();

  if (!providers) {
    return null;
  }

  return (
    <>
      <NextSeo description={LL.common.seo.description()} />

      <Container>
        <Form method="post" action="/api/auth/signIn/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Textfield
            type="email"
            id="email"
            name="email"
            label={LL.app_signIn.email.label()}
            borderRadius="md"
            placeholder={LL.app_signIn.email.placeholder()}
          />
          <Button type="submit" style={{ marginTop: 8 }}>
            {LL.app_signIn.email.button()}
          </Button>
        </Form>
      </Container>
    </>
  );
};

LoginPage.getLayout = (page: ReactNode): ReactNode => (
  <AppLayout>{page}</AppLayout>
);

LoginPage.namespaces = [...globalNamespaces, 'app_signIn'];

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
  csrfToken: string | undefined;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: { providers, csrfToken },
  };
};

export default LoginPage;
