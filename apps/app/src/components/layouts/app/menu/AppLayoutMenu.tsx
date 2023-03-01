import { styled } from '@my-coin/ui';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC } from 'react';
import { AppLayoutMenuItem } from './menuItem';
import logo from '../../../../../public/images/500x500.png';
import Link from 'next/link';
import { getLink } from '@my-coin/router/dist/app';
import { useRouter } from 'next/router';
import { CogIcon } from '@my-coin/ui/dist/icons/Cog';
import { LogInIcon } from '@my-coin/ui/dist/icons/LogIn';
import { TransferIcon } from '@my-coin/ui/dist/icons/Transfer';
import { CoinIcon } from '@my-coin/ui/dist/icons/Coin';
import { CoinSolidIcon } from '@my-coin/ui/dist/icons/CoinSolid';
import { HeartIcon } from '@my-coin/ui/dist/icons/Heart';
import { HeartSolidIcon } from '@my-coin/ui/dist/icons/HeartSolid';
import { LayerIcon } from '@my-coin/ui/dist/icons/Layer';
import { LayerSolidIcon } from '@my-coin/ui/dist/icons/LayerSolid';

const Container = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  rowGap: 40,
  flex: 1,
  userSelect: 'none',
});

const Button = styled('span', {
  backgroundColor: '$primary',
  color: '$white_FIX',
  borderRadius: '$md',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  whiteSpace: 'nowrap',
  width: '100%',
  border: '2px solid $transparent',
  padding: '$8 $16',
  minWidth: 200,

  variants: {
    outlined: {
      true: {
        backgroundColor: '$white',
        color: '$primary',
        border: '2px solid $primary',
      },
    },
  },
});

const PlanContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
const PlanLink = styled('span', {
  color: '$primary',
  marginTop: 8,
  overflow: 'hidden',
  display: 'flex',
  whiteSpace: 'nowrap',
});

const SwitchRoleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  a: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Menu = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  rowGap: 28,
  transition: 'all 0.3s ease',
  width: '100%',
});

const MenuBottom = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: 28,
  marginTop: 'auto',
  width: '100%',
});

type CustomProps = {
  onClosed?: () => void;
};

export const AppLayoutMenu: FC<CustomProps> = ({ onClosed }) => {
  const { data: dataSession, status } = useSession();

  const router = useRouter();

  return (
    <Container>
      <Link
        href={
          dataSession?.user?.role === 'ADMIN'
            ? getLink('admin.dashboard')
            : getLink('home')
        }
      >
        <Image src={logo} height={120} width={120} alt="Logo My Coin" />
      </Link>

      {dataSession?.user?.role === 'ADMIN' && (
        <SwitchRoleContainer>
          {router.pathname.includes('admin') ? (
            <Link href={getLink('home')}>
              <Button outlined>Switch to User</Button>
            </Link>
          ) : (
            <Link href={getLink('admin.dashboard')}>
              <Button outlined>Switch to Admin</Button>
            </Link>
          )}
        </SwitchRoleContainer>
      )}

      {dataSession?.user && (
        <PlanContainer>
          <Link href={getLink('home')}>
            <PlanLink>Billing & Plans</PlanLink>
          </Link>
        </PlanContainer>
      )}

      <Menu>
        {(router.pathname.includes('admin')
          ? [
              {
                type: 'link',
                icon: LayerIcon,
                label: 'Dashboard',
                link: getLink('admin.dashboard'),
                linkAs: [getLink('admin.dashboard')],
              },
            ]
          : [
              {
                type: 'link',
                icon: LayerIcon,
                iconActive: LayerSolidIcon,
                label: 'Catalog',
                link: getLink('home'),
                linkAs: [getLink('home')],
              },
              {
                type: 'link',
                icon: CoinIcon,
                label: 'My Collection',
                link: getLink('my-collection'),
                linkAs: [getLink('my-collection')],
              },
              ...(status === 'authenticated'
                ? [
                    {
                      type: 'link',
                      icon: HeartIcon,
                      iconActive: HeartSolidIcon,
                      label: 'My wishlist',
                      link: getLink('user.wishlist', {
                        queries: {
                          userId: dataSession?.user?.id ?? '',
                        },
                      }),
                      linkAs: [
                        getLink('user.wishlist', {
                          queries: {
                            userId: dataSession?.user?.id ?? '',
                          },
                        }),
                      ],
                    },
                  ]
                : []),
              {
                type: 'link',
                icon: TransferIcon,
                iconActive: CoinSolidIcon,
                label: 'Exchange',
                link: getLink('exchange'),
                linkAs: [getLink('exchange')],
              },
            ]
        ).map((item, itemKey) => (
          <AppLayoutMenuItem item={item} key={itemKey} onClosed={onClosed} />
        ))}
      </Menu>

      <MenuBottom>
        {dataSession?.user ? (
          <AppLayoutMenuItem
            item={{
              icon: CogIcon,
              label: 'Settings',
              link: getLink('settings'),
              linkAs: [getLink('settings')],
              type: 'link',
            }}
            onClosed={onClosed}
          />
        ) : (
          <AppLayoutMenuItem
            item={{
              icon: LogInIcon,
              label: 'Login',
              link: getLink('login'),
              linkAs: [getLink('login')],
              type: 'link',
            }}
            onClosed={onClosed}
          />
        )}
      </MenuBottom>
    </Container>
  );
};
