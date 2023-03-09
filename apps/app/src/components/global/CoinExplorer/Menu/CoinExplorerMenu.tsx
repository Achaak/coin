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
import { Catalog } from '../../../../selector/catalog';
import { CoinExplorerContext } from '../CoinExplorer';
import { Period } from '../../../../selector/period';
import { Flag } from '../../Flag';

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
        const period = acc.find((c) => c.period.id === catalog.periodId);

        if (period) {
          if (!period.catalogs.some((c) => c.id === catalog.id)) {
            period.catalogs.push(catalog);
          }
        } else {
          acc.push({
            period: catalog.period,
            name: catalog.period.name,
            catalogs: [catalog],
          });
        }

        return acc;
      }, [] as Array<{ period: Period; name: string; catalogs: Catalog[] }>),
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
      defaultValue={orderByPeriod?.[0].period.id}
      collapsible
    >
      {orderByPeriod?.map((element) => (
        <Item value={element.period.id}>
          <Header>
            <TriggerStyled>
              <TriggerLeft>
                <Flag
                  url={element.period.flag}
                  alt={element.period.name}
                  size={24}
                />
                {element.name}
              </TriggerLeft>
              <ChevronDownIcon aria-hidden />
            </TriggerStyled>
          </Header>
          <ContentStyled>
            {element.catalogs.map((catalog) => (
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
