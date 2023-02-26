import { styled } from '@my-coin/ui';
import { Searchbar } from '@my-coin/ui/dist/components/inputs/searchbar/index';
import { MenuIcon } from '@my-coin/ui/dist/icons/Menu';
import { Avatar } from '@my-coin/ui/dist/components/avatar/index';
import { FC, useState } from 'react';
import { AppLayoutSmall } from '../small';
import { useSession } from 'next-auth/react';
import { useMediaScreenValid } from '@pikas-utils/screen';
import { Select } from '@my-coin/ui/dist/components/inputs/select/index';
import { useI18nContext } from '@my-coin/translate';
import { useRouter } from 'next/router';

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Left = styled('div', {
  display: 'flex',
  order: 1,
  flex: 1,

  '@lg': {
    order: 0,
  },
});

const Right = styled('div', {
  display: 'flex',
  alignItems: 'center',
  columnGap: 8,
  order: 0,

  '@lg': {
    order: 1,
  },
});

const UserName = styled('span', {
  fontWeight: '$medium',
  fontSize: '$LARGE',
  order: 1,
  color: '$black',

  '@lg': {
    order: 0,
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
          />
          {dataSession?.user && (
            <>
              <UserName>{dataSession.user.name}</UserName>
              <Avatar
                alt={dataSession.user.name ?? undefined}
                borderRadius="full"
                fallback="D"
                size={largeScreenValid ? 40 : 32}
                src={dataSession.user.image ?? undefined}
              />
            </>
          )}
        </Right>
      </Container>
    </>
  );
};
