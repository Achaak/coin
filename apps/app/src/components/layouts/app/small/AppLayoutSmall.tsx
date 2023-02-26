import { styled } from '@my-coin/ui';
import { FC } from 'react';
import { AppLayoutMenu } from '../menu';
import { XIcon } from '@my-coin/ui/dist/icons/X';

const Container = styled('div', {
  position: 'fixed',
  left: 0,
  right: 0,
  height: '100%',
  backgroundColor: '$white',
  padding: 32,
  zIndex: '$max',
  overflow: 'auto',
  transition: 'top 0.2s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',

  '@lg': {
    display: 'none',
  },

  variants: {
    isOpen: {
      true: {
        top: 0,
      },
      false: {
        top: '-100%',
      },
    },
  },
});

const Content = styled('div', {
  display: 'flex',
});

type CustomProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AppLayoutSmall: FC<CustomProps> = ({ isOpen, onClose }) => (
  <Container isOpen={isOpen}>
    <XIcon
      onClick={onClose}
      size={32}
      colorName="black"
      css={{
        container: {
          cursor: 'pointer',
          position: 'absolute',
          top: 16,
          right: 16,
        },
      }}
    />
    <Content>
      <AppLayoutMenu onClosed={onClose} />
    </Content>
  </Container>
);
