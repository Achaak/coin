import { styled } from '@my-coin/ui/dist/core/pikas-ui/Styles';
import { useSession } from 'next-auth/react';
import { FC, ReactNode, useEffect } from 'react';
import { AppLayoutLarge } from './large';
import { AppLayoutSettingsBar } from './settingsBar';
import { userStore } from '../../../store/user';
import { useStore } from 'zustand';
import { wishlistStore } from '../../../store/wishlist';

const Container = styled('div', {
  backgroundColor: '$background',
  position: 'fixed',
  top: '$0',
  left: '$0',
  right: '$0',
  bottom: '$0',
  display: 'flex',
  flexDirection: 'row',
  transition: 'all 0.3s ease',

  '@lg': {
    columnGap: '$40',
  },
});

const Right = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  rowGap: '$8',
  position: 'relative',
  marginTop: '$16',
  marginLeft: '$16',

  '@lg': {
    rowGap: '$40',
    marginTop: '$40',
    marginLeft: '$0',
  },
});

const ContentContainer = styled('div', {
  flex: 1,
  position: 'relative',
});

const Content = styled('div', {
  position: 'absolute',
  top: '$0',
  left: '$0',
  right: '$0',
  bottom: '$0',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  flexDirection: 'column',
  overflowY: 'auto',
  rowGap: '$8',
  paddingTop: '$64',
  paddingRight: '$16',

  '@lg': {
    rowGap: '$40',
    paddingRight: '$40',
    paddingTop: '$80',
  },
});

type AppLayoutProps = {
  children?: ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { data } = useSession();

  const { setMe } = useStore(userStore, (state) => ({
    setMe: state.setMe,
  }));
  const { init: initWishlist } = useStore(wishlistStore, (state) => ({
    init: state.init,
  }));

  useEffect(() => {
    if (data?.user) {
      setMe(data.user);
      initWishlist();
    }
  }, [data?.user, setMe, initWishlist]);

  return (
    <Container>
      <AppLayoutLarge />

      <Right>
        <AppLayoutSettingsBar />

        <ContentContainer>
          <Content>{children}</Content>
        </ContentContainer>
      </Right>
    </Container>
  );
};
