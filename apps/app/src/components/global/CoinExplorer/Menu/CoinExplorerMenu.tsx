import { FC, useContext, useEffect, useMemo } from 'react';
import { trpc } from '../../../../utils/trpc';
import {
  Item,
  Root,
  Header,
  Content,
  Trigger,
} from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@my-coin/ui/dist/icons/ChevronDown';
import { styled } from '@my-coin/ui';
import Image from 'next/image';
import { Catalog } from '../../../../selector/catalog';
import { CoinExplorerContext } from '../CoinExplorer';

const RootStyled = styled(Root, {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  rowGap: '$16',
});

const TriggerStyled = styled(Trigger, {
  all: 'unset',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
  cursor: 'pointer',
});

const TriggerLeft = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$8',
});

const ContentStyled = styled(Content, {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  rowGap: '$8',
  // padding: '$8 0',
});

const ContentItem = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  cursor: 'pointer',
});

export const CoinExplorerMenu: FC = () => {
  const { userId, setCatalogIdSelected } = useContext(CoinExplorerContext);
  const { data: catalogs, isLoading: catalogsIsLoading } =
    trpc.catalog.getByUserId.useQuery({
      userId,
    });

  const orderByCountry = useMemo(
    () =>
      catalogs?.reduce((acc, catalog) => {
        const country = acc.find((c) => c.code === catalog.countryCode);

        if (country) {
          if (!country.catalogs.some((c) => c.id === catalog.id)) {
            country.catalogs.push(catalog);
          }
        } else {
          acc.push({
            code: catalog.countryCode,
            name: catalog.country.name,
            catalogs: [catalog],
          });
        }

        return acc;
      }, [] as Array<{ code: string; name: string; catalogs: Catalog[] }>),
    [catalogs]
  );

  useEffect(() => {
    if (orderByCountry?.length) {
      setCatalogIdSelected(orderByCountry[0].catalogs[0].id);
    }
  }, [orderByCountry, setCatalogIdSelected]);

  if (catalogsIsLoading) {
    return <>Loading...</>;
  }

  return (
    <RootStyled type="single" defaultValue="item-1" collapsible>
      {orderByCountry?.map((country) => (
        <Item value={country.code}>
          <Header>
            <TriggerStyled>
              <TriggerLeft>
                <Image
                  src={`/flags/${country.code}.svg`}
                  height={24}
                  width={24}
                  alt="Logo My Coin"
                />
                {country.name}
              </TriggerLeft>
              <ChevronDownIcon aria-hidden />
            </TriggerStyled>
          </Header>
          <ContentStyled>
            {country.catalogs.map((catalog) => (
              <ContentItem onClick={() => setCatalogIdSelected(catalog.id)}>
                {catalog.name}
              </ContentItem>
            ))}
          </ContentStyled>
        </Item>
      ))}
    </RootStyled>
  );
};
