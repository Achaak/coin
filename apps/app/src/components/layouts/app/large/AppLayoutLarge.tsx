import { styled } from '@my-coin/ui';
import { FC } from 'react';
import { AppLayoutMenu } from '../menu';

const Container = styled('div', {
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  backgroundColor: '$gray',
  borderRadius: '$3xl',
  transition: 'all 0.3s ease',

  '@lg': {
    display: 'flex',
    padding: '$40',
  },
});

export const AppLayoutLarge: FC = () => (
  <Container>
    <AppLayoutMenu />
  </Container>
);
