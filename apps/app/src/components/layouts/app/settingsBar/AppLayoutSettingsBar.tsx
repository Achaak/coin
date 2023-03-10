import { styled } from '@my-coin/ui';
import { MenuIcon } from '@my-coin/ui/dist/icons/Menu';
import { Avatar } from '@my-coin/ui/dist/components/avatar/index';
import { FC, useState } from 'react';
import { AppLayoutSmall } from '../small';
import { signOut, useSession } from 'next-auth/react';
import { useMediaScreenValid } from '@pikas-utils/screen';
import { Select } from '@my-coin/ui/dist/components/inputs/select/index';
import { useI18nContext } from '@my-coin/translate';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getLink } from '@my-coin/router/dist/app';
import { ButtonIcon } from '@my-coin/ui/dist/components/inputs/button/index';
import { DropdownMenu } from '@my-coin/ui/dist/components/dropdownMenu/index';
import { SearchIcon } from '@my-coin/ui/dist/icons/Search';
import { LogOutIcon } from '@my-coin/ui/dist/icons/LogOut';
import { Textfield } from '@my-coin/ui/dist/components/inputs/textfield/index';
import { UserIcon } from '@my-coin/ui/dist/icons/User';
import { currencies } from '../../../../configs/currency';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: '$x-high',
  height: '$64',
  background: 'linear-gradient($white 40%, $transparent)',
  paddingRight: '$16',
  alignItems: 'start',
  paddingLeft: '$0',

  '@lg': {
    paddingRight: '$32',
    height: '$80',
    paddingLeft: '$24',
  },
  '@xl': {
    paddingRight: '$40',
    paddingLeft: '$32',
  },
});

const Left = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const Right = styled('div', {
  display: 'flex',
  alignItems: 'center',
  columnGap: '$8',

  '@xs': {
    columnGap: '$12',
  },
  '@md': {
    columnGap: '$16',
  },
});

const UserName = styled('span', {
  fontWeight: '$medium',
  fontSize: '$em-large',
  color: '$black',
  maxWidth: '$64',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'block',

  '@lg': {
    display: 'block',
    maxWidth: '$120',
  },
});

const Login = styled('span', {
  fontWeight: '$medium',
  backgroundColor: '$primary',
  fontSize: '$em-small',
  color: '$white',
  borderRadius: '$full',
  padding: '$4 $16',

  '@lg': {
    fontSize: '$em-base',
    padding: '$8 $16',
  },
});

export const AppLayoutSettingsBar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: dataSession } = useSession();
  const largeScreenValid = useMediaScreenValid({
    media: 'lg',
    operator: '>=',
  });
  const router = useRouter();
  const { locale } = useI18nContext();
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useLocalStorage('currency', 'USD');

  const handleSearch = (): void => {
    void router.push(getLink('search', { queries: { q: search } }));
  };

  return (
    <>
      <AppLayoutSmall
        isOpen={isMenuOpen}
        onClose={(): void => setIsMenuOpen(false)}
      />
      <Container>
        <Left>
          <Textfield
            placeholder="Search"
            backgroundColorName="gray"
            width="50%"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            css={{
              container: {
                display: 'none',

                '@lg': {
                  display: 'initial',
                },
              },
              input: {
                height: 35,
                paddingLeft: '$24',
              },
            }}
            rightChildren={
              <SearchIcon
                size={16}
                colorName="black"
                css={{
                  container: {
                    paddingRight: '$8',
                  },
                }}
                onClick={handleSearch}
              />
            }
          />
          <ButtonIcon
            Icon={SearchIcon}
            css={{
              button: {
                display: 'initial',

                '@lg': {
                  display: 'none',
                },
              },
            }}
            size={20}
            padding="sm"
            outlined
          />
        </Left>
        <Right>
          <Select
            data={[
              {
                items: [
                  {
                    label: 'EN',
                    value: 'en',
                  },
                  {
                    label: 'FR',
                    value: 'fr',
                  },
                ],
              },
            ]}
            onChange={(value) => {
              void router.push(
                router.pathname,
                { ...router },
                {
                  locale: value as string,
                }
              );
            }}
            defaultValue={locale}
            width="auto"
            backgroundColorName="gray"
            fontSize="em-small"
            css={{
              trigger: {
                fontWeight: '$medium',
                padding: '$4 $8',

                '@lg': {
                  padding: '$8 $16',
                },
              },
            }}
          />
          <Select
            data={[
              {
                items: currencies.map((c) => ({
                  label: c,
                  value: c,
                })),
              },
            ]}
            onChange={(value) => {
              setCurrency(value as string);
            }}
            defaultValue={currency}
            width="auto"
            backgroundColorName="gray"
            fontSize="em-small"
            css={{
              trigger: {
                fontWeight: '$medium',
                padding: '$4 $8',

                '@lg': {
                  padding: '$8 $16',
                },
              },
            }}
          />
          {dataSession?.user ? (
            <>
              {largeScreenValid && (
                <Link
                  href={getLink('user.item', {
                    queries: {
                      userId: dataSession.user.id,
                    },
                  })}
                >
                  <UserName>{dataSession.user.name}</UserName>
                </Link>
              )}
              <DropdownMenu
                triggerContent={
                  <Avatar
                    alt={dataSession.user.name ?? undefined}
                    borderRadius="full"
                    fallback={dataSession.user.name?.[0] ?? undefined}
                    size={largeScreenValid ? 40 : 32}
                    src={dataSession.user.image ?? undefined}
                  />
                }
                data={[
                  {
                    items: [
                      {
                        label: 'Profile',
                        type: 'item',
                        Icon: UserIcon,
                        onClick: () => {
                          void router.push(
                            getLink('user.item', {
                              queries: {
                                userId: dataSession.user?.id ?? '',
                              },
                            })
                          );
                        },
                      },
                    ],
                  },
                  {
                    items: [
                      {
                        label: 'Logout',
                        type: 'item',
                        onClick: () => {
                          void signOut();
                        },
                        Icon: LogOutIcon,
                      },
                    ],
                  },
                ]}
              />
            </>
          ) : (
            <Link href={getLink('login')}>
              <Login>Login / Register</Login>
            </Link>
          )}
          <MenuIcon
            size={32}
            colorName="black"
            onClick={(): void => setIsMenuOpen(true)}
            css={{
              container: {
                cursor: 'pointer',
                display: 'flex',

                '@lg': {
                  display: 'none',
                },
              },
            }}
          />
        </Right>
      </Container>
    </>
  );
};
