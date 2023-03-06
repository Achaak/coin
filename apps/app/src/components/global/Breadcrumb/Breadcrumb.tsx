import { PikasCSS, styled } from '@my-coin/ui';
import Link from 'next/link';
import type { FC } from 'react';
import { ChevronRightIcon } from '@my-coin/ui/dist/icons/ChevronRight';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$2',
  rowGap: '$8',
  flexWrap: 'wrap',
  fontSize: '$em-small',

  '@lg': {
    fontSize: '$em-base',
    columnGap: '$4',
    rowGap: '$8',
  },
});

const Element = styled('span', {
  backgroundColor: '$gray',
  borderRadius: '$3xl',
  padding: '$4 $8',
  color: '$black',
  transition: 'all 0.2s ease-in-out',
  fontSize: '$em-small',

  '@lg': {
    padding: '$8 $16',
  },

  variants: {
    current: {
      true: {
        opacity: 0.7,
      },
      false: {
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: '$primary',
          color: '$white',
        },
      },
    },
  },
});

export type InfosProps = {
  css?: PikasCSS;
  data: Array<{
    label: string;
    url?: string;
    current?: boolean;
  }>;
};

export const Breadcrumb: FC<InfosProps> = ({ css, data }) => (
  <Container
    css={{
      ...css,
    }}
  >
    {data.map((item, index) => {
      const isLast = data.indexOf(item) === data.length - 1;

      const res = [];

      if (item.url) {
        res.push(
          <Link href={item.url} key={index}>
            <Element current={item.current ?? false}>{item.label}</Element>
          </Link>
        );
      } else {
        res.push(
          <Element current={item.current ?? false} key={index}>
            {item.label}
          </Element>
        );
      }

      if (!isLast) {
        res.push(
          <ChevronRightIcon
            size={24}
            colorName="gray-darker"
            key={`chevron-${index}`}
          />
        );
      }

      return res;
    })}
  </Container>
);
