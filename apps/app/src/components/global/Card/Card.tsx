import { PikasCSS, PikasRadius, PikasSize, styled } from '@my-coin/ui';
import type { FC, ReactNode } from 'react';

const Container = styled('div', {
  backgroundColor: '$gray',
  width: '100%',
});

export type CardPaddingHorizontal = {
  default?: PikasSize;
  xs?: PikasSize;
  sm?: PikasSize;
  md?: PikasSize;
  lg?: PikasSize;
  xl?: PikasSize;
  '2xl'?: PikasSize;
};

export type CardPaddingVertical = {
  default?: PikasSize;
  xs?: PikasSize;
  sm?: PikasSize;
  md?: PikasSize;
  lg?: PikasSize;
  xl?: PikasSize;
  '2xl'?: PikasSize;
};

export type CardBorderRadius = {
  default?: PikasRadius;
  xs?: PikasRadius;
  sm?: PikasRadius;
  md?: PikasRadius;
  lg?: PikasRadius;
  xl?: PikasRadius;
  '2xl'?: PikasRadius;
};

export type CardProps = {
  children?: ReactNode;
  paddingHorizontal?: CardPaddingHorizontal;
  paddingVertical?: CardPaddingVertical;
  css?: PikasCSS;
  borderRadius?: CardBorderRadius;
};

export const Card: FC<CardProps> = ({
  children,
  paddingHorizontal = {
    default: 16,
    md: 20,
    xl: 24,
  },
  paddingVertical = {
    default: 16,
    md: 20,
    xl: 24,
  },
  css,
  borderRadius = {
    default: '3xl',
  },
}) => (
  <Container
    css={{
      paddingLeft: paddingHorizontal?.default,
      paddingRight: paddingHorizontal?.default,
      paddingTop: paddingVertical?.default,
      paddingBottom: paddingVertical?.default,
      borderRadius: borderRadius?.default
        ? `$${borderRadius?.default}`
        : undefined,

      ...css,

      '@xs': {
        paddingLeft: paddingHorizontal?.xs,
        paddingRight: paddingHorizontal?.xs,
        paddingTop: paddingVertical?.xs,
        paddingBottom: paddingVertical?.xs,
        borderRadius: borderRadius?.xs ? `$${borderRadius?.xs}` : undefined,
        ...css?.['@xs'],
      },
      '@sm': {
        paddingLeft: paddingHorizontal?.sm,
        paddingRight: paddingHorizontal?.sm,
        paddingTop: paddingVertical?.sm,
        paddingBottom: paddingVertical?.sm,
        borderRadius: borderRadius?.sm ? `$${borderRadius?.sm}` : undefined,
        ...css?.['@sm'],
      },
      '@md': {
        paddingLeft: paddingHorizontal?.md,
        paddingRight: paddingHorizontal?.md,
        paddingTop: paddingVertical?.md,
        paddingBottom: paddingVertical?.md,
        borderRadius: borderRadius?.md ? `$${borderRadius?.md}` : undefined,
        ...css?.['@md'],
      },
      '@lg': {
        paddingLeft: paddingHorizontal?.lg,
        paddingRight: paddingHorizontal?.lg,
        paddingTop: paddingVertical?.lg,
        paddingBottom: paddingVertical?.lg,
        borderRadius: borderRadius?.lg ? `$${borderRadius?.lg}` : undefined,
        ...css?.['@lg'],
      },
      '@xl': {
        paddingLeft: paddingHorizontal?.xl,
        paddingRight: paddingHorizontal?.xl,
        paddingTop: paddingVertical?.xl,
        paddingBottom: paddingVertical?.xl,
        borderRadius: borderRadius?.xl ? `$${borderRadius?.xl}` : undefined,
        ...css?.['@xl'],
      },
      '@2xl': {
        paddingLeft: paddingHorizontal?.['2xl'],
        paddingRight: paddingHorizontal?.['2xl'],
        paddingTop: paddingVertical?.['2xl'],
        paddingBottom: paddingVertical?.['2xl'],
        borderRadius: borderRadius?.['2xl'],
        ...css?.['@2xl'],
      },
    }}
  >
    {children}
  </Container>
);
