import { styled } from '@my-coin/ui';
import { FC } from 'react';
import { AppLayoutMenu } from '../menu';

const Container = styled('div', {
  display: 'none',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
  backgroundColor: '$gray',
  borderRadius: '$3xl',
  transition: 'all 0.3s ease',
  minWidth: 250,
  margin: '$16 0 $16 $16',

  '@lg': {
    display: 'flex',
    padding: '$32',
    margin: '$24 0 $24 $24',
  },

  '@xl': {
    padding: '$40',
    margin: '$32 0 $32 $32',
  },
});

export const AppLayoutLarge: FC = () => (
  <Container>
    <AppLayoutMenu />
  </Container>
);
