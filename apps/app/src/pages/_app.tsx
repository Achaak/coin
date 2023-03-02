import { themeDefault } from '@my-coin/ui/dist/styles/theme-default';
import { customGlobalCss } from '@my-coin/ui/dist/styles/globalCss';
import type {
  Locales,
  Namespaces,
} from '@my-coin/translate/dist/i18n/i18n-types';
import { CustomTypesafeI18n } from '@my-coin/translate/dist/CustomTypesafeI18n/index';
import {
  baseLocale,
  detectLocale,
} from '@my-coin/translate/dist/i18n/i18n-util';
import { loadLocaleAsync } from '@my-coin/translate/dist/i18n/i18n-util.async';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { ReactNode, useEffect, useState } from 'react';
import SEO from '../../next-seo.config';
import { PikasUIProvider } from '@my-coin/ui/dist/core/pikas-ui/Styles';
import type { Session } from 'next-auth';
import { trpc } from '../utils/trpc';
import { ToastProvider } from '@my-coin/ui/dist/core/pikas-ui/Toast';

export type NextPageWithLayout<
  T extends Record<string, unknown> = Record<string, unknown>
> = NextPage<T> & {
  getLayout?: (page: ReactNode) => ReactNode;
  namespaces?: Namespaces[];
};

type AppPropsWithLayout = AppProps<{ session?: Session | null | undefined }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout): JSX.Element => {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode): ReactNode => page);

  const [locale, setLocale] = useState<Locales | undefined>(undefined);

  customGlobalCss();

  useEffect(() => {
    const l = detectLocale(() => [router.locale ?? baseLocale]);

    loadLocaleAsync(l)
      .then(() => setLocale(l))
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }, [router.locale]);

  return (
    <>
      <DefaultSeo {...SEO} />
      <PikasUIProvider lightTheme={themeDefault} darkTheme={themeDefault}>
        <ToastProvider position="top-right">
          <SessionProvider session={session}>
            {locale && (
              <CustomTypesafeI18n
                locale={locale}
                namespaces={Component.namespaces}
              >
                {getLayout(<Component {...pageProps} />)}
              </CustomTypesafeI18n>
            )}
          </SessionProvider>
        </ToastProvider>
      </PikasUIProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
