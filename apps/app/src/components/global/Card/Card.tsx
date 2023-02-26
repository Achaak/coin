import { PikasCSS, PikasSize, styled } from '@my-coin/ui';
import type { FC, ReactNode } from 'react';

const Container = styled('div', {});

type CardProps = {
  children?: ReactNode;
  paddingHorizontal?: {
    default?: PikasSize;
    xs?: PikasSize;
    sm?: PikasSize;
    md?: PikasSize;
    lg?: PikasSize;
    xl?: PikasSize;
    '2xl'?: PikasSize;
  };
  paddingVertical?: {
    default?: PikasSize;
    xs?: PikasSize;
    sm?: PikasSize;
    md?: PikasSize;
    lg?: PikasSize;
    xl?: PikasSize;
    '2xl'?: PikasSize;
  };
  css?: PikasCSS;
};

export const Card: FC<CardProps> = ({
  children,
  paddingHorizontal,
  paddingVertical,
  css,
}) => (
  <Container
    css={{
      paddingLeft: paddingHorizontal?.default,
      paddingRight: paddingHorizontal?.default,
      paddingTop: paddingVertical?.default,
      paddingBottom: paddingVertical?.default,

      '@xs': {
        paddingLeft: paddingHorizontal?.xs,
        paddingRight: paddingHorizontal?.xs,
        paddingTop: paddingVertical?.xs,
        paddingBottom: paddingVertical?.xs,
      },
      '@sm': {
        paddingLeft: paddingHorizontal?.sm,
        paddingRight: paddingHorizontal?.sm,
        paddingTop: paddingVertical?.sm,
        paddingBottom: paddingVertical?.sm,
      },
      '@md': {
        paddingLeft: paddingHorizontal?.md,
        paddingRight: paddingHorizontal?.md,
        paddingTop: paddingVertical?.md,
        paddingBottom: paddingVertical?.md,
      },
      '@lg': {
        paddingLeft: paddingHorizontal?.lg,
        paddingRight: paddingHorizontal?.lg,
        paddingTop: paddingVertical?.lg,
        paddingBottom: paddingVertical?.lg,
      },
      '@xl': {
        paddingLeft: paddingHorizontal?.xl,
        paddingRight: paddingHorizontal?.xl,
        paddingTop: paddingVertical?.xl,
        paddingBottom: paddingVertical?.xl,
      },
      '@2xl': {
        paddingLeft: paddingHorizontal?.['2xl'],
        paddingRight: paddingHorizontal?.['2xl'],
        paddingTop: paddingVertical?.['2xl'],
        paddingBottom: paddingVertical?.['2xl'],
      },

      ...css,
    }}
  >
    {children}
  </Container>
);