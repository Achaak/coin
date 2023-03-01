import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Title } from '@my-coin/ui/dist/components/title/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Catalog } from '../../../../selector/catalog';
import { trpc } from '../../../../utils/trpc';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$24',
});

const CatalogsContainer = styled('ul', {
  display: 'flex',
});

export const SearchCatalogsContainer: FC = () => {
  const router = useRouter();
  const { q } = router.query;

  const { data: catalogsData, isLoading: catalogIsLoading } =
    trpc.catalog.search.useQuery({
      query: q as string,
    });

  return (
    <Container>
      <Title as="h2">Catalogs</Title>

      {catalogIsLoading ? (
        <p>Loading...</p>
      ) : (
        <CatalogsContainer>
          {catalogsData?.map((catalog) => (
            <CatalogItem key={catalog.id} catalog={catalog} />
          ))}
        </CatalogsContainer>
      )}
    </Container>
  );
};

const CatalogItemStyled = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const CatalogItem: FC<{ catalog: Catalog }> = ({ catalog }) => (
  <Link
    href={getLink('catalog', {
      queries: {
        catalogId: catalog.id,
      },
    })}
  >
    <CatalogItemStyled>{catalog.name}</CatalogItemStyled>
  </Link>
);
