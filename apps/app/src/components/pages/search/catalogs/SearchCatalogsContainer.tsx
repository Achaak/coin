import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Catalog } from '../../../../selector/catalog';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$16',
  width: '100%',
});

type SearchCatalogsContainerProps = {
  catalogs: Catalog[];
};

export const SearchCatalogsContainer: FC<SearchCatalogsContainerProps> = ({
  catalogs,
}) => (
  <Container>
    <Title as="h2">Catalogs</Title>

    <Grid
      type="container"
      cols={{
        default: 1,
        lg: 2,
        xl: 3,
        '2xl': 4,
      }}
      columnGap={{
        default: 16,
        xl: 24,
      }}
      rowGap={{
        default: 16,
        xl: 24,
      }}
    >
      {catalogs?.map((catalog) => (
        <CatalogItem key={catalog.id} catalog={catalog} />
      ))}
    </Grid>
  </Container>
);

const CatalogItemStyled = styled('li', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '$gray',
  padding: '$8 $16',
  borderRadius: '$2xl',
  transition: 'all 0.2s ease-in-out',
  columnGap: '$16',

  span: {
    '&:hover': {
      color: '$primary',
    },
  },
});

const CatalogItemFlag = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$12',
  borderRadius: '$3xl',
  backgroundColor: '$white',
});

const CatalogItemName = styled('span', {
  fontWeight: '$medium',
  color: '$black',
  minWidth: '$192',
});

const CatalogItem: FC<{ catalog: Catalog }> = ({ catalog }) => (
  <Link
    href={getLink('catalog', {
      queries: {
        catalogId: catalog.id,
      },
    })}
  >
    <CatalogItemStyled>
      <CatalogItemFlag>
        <Image
          src={`/flags/${catalog.countryCode}.svg`}
          alt={catalog.countryCode}
          width={24}
          height={24}
        />
      </CatalogItemFlag>
      <CatalogItemName>{catalog.name}</CatalogItemName>
    </CatalogItemStyled>
  </Link>
);
