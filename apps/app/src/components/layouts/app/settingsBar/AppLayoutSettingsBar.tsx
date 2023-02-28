import { styled } from '@my-coin/ui';
import { Searchbar } from '@my-coin/ui/dist/components/inputs/searchbar/index';
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

  '@lg': {
    paddingRight: '$40',
    height: '$80',
  },
});

const Left = styled('div', {
  display: 'flex',
  flex: 1,
});

const Right = styled('div', {
  display: 'flex',
  alignItems: 'center',
  columnGap: '$16',
});

const UserName = styled('span', {
  fontWeight: '$medium',
  fontSize: '$em-large',
  color: '$black',
});

const Login = styled('span', {
  fontWeight: '$medium',
  backgroundColor: '$primary',
  fontSize: '$em-base',
  color: '$white',
  borderRadius: '$full',
  padding: '$8 $24',
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

  return (
    <>
      <AppLayoutSmall
        isOpen={isMenuOpen}
        onClose={(): void => setIsMenuOpen(false)}
      />
      <Container>
        <Left>
          <Searchbar
            textfield={{
              placeholder: 'Search',
              padding: 'lg',
            }}
            width="50%"
            onSearch={() => []}
            searchFunction={(): Promise<[]> => Promise.resolve([])}
            css={{
              container: {
                display: 'none',

                '@lg': {
                  display: 'initial',
                },
              },
            }}
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
            size={24}
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
            css={{
              trigger: {
                fontWeight: '$medium',
              },
            }}
          />
          {dataSession?.user ? (
            <>
              <Link
                href={getLink('user', {
                  queries: {
                    userId: dataSession.user.id,
                  },
                })}
              >
                <UserName>{dataSession.user.name}</UserName>
              </Link>
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
