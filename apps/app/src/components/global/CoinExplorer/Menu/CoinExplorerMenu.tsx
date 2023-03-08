import { FC, useContext, useEffect, useMemo } from 'react';
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
  const { catalogsIsLoading, catalogs, setCatalogIdSelected } =
    useContext(CoinExplorerContext);

  const orderByPeriod = useMemo(
    () =>
      catalogs?.reduce((acc, catalog) => {
        const period = acc.find((c) => c.periodId === catalog.periodId);

        if (period) {
          if (!period.catalogs.some((c) => c.id === catalog.id)) {
            period.catalogs.push(catalog);
          }
        } else {
          acc.push({
            periodId: catalog.periodId,
            name: catalog.period.name,
            catalogs: [catalog],
          });
        }

        return acc;
      }, [] as Array<{ code: string; name: string; catalogs: Catalog[] }>),
    [catalogs]
  );

  useEffect(() => {
    if (orderByPeriod?.length) {
      setCatalogIdSelected(orderByPeriod[0].catalogs[0].id);
    }
  }, [orderByPeriod, setCatalogIdSelected]);

  if (catalogsIsLoading) {
    return <>Loading...</>;
  }

  return (
    <RootStyled
      type="single"
      defaultValue={orderByPeriod?.[0].code}
      collapsible
    >
      {orderByPeriod?.map((period) => (
        <Item value={period.code}>
          <Header>
            <TriggerStyled>
              <TriggerLeft>
                <Image
                  src={`/flags/${period.code}.svg`}
                  height={24}
                  width={24}
                  alt="Logo My Coin"
                />
                {period.name}
              </TriggerLeft>
              <ChevronDownIcon aria-hidden />
            </TriggerStyled>
          </Header>
          <ContentStyled>
            {period.catalogs.map((catalog) => (
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
