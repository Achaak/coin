import { styled } from '@my-coin/ui';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC } from 'react';
import { Breadcrumb } from '../../../global/Breadcrumb';
import { Card } from '../../../global/Card';
import { Infos } from '../../../global/Infos';
import { Table } from '@my-coin/ui/dist/components/table/index';
import { CoinHeaderContainer } from '../header';
import { Coin } from '../../../../selector/coin';
import { getLink } from '@my-coin/router/dist/app';
import { CoinRefWithCatalog } from '../../../../selector/coinRef';

const CoinImageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$16',
  backgroundColor: '$white',
  borderRadius: '$3xl',
});

type CoinItemContainerProps = {
  coin: Coin;
  coinRef: CoinRefWithCatalog;
};

export const CoinItemContainer: FC<CoinItemContainerProps> = ({
  coin,
  coinRef,
}) => (
  <>
    <Breadcrumb
      data={[
        {
          label: 'Accueil',
          url: getLink('home'),
        },
        {
          label: 'France',
          url: '/france',
        },
        {
          label: coinRef.denomination,
          url: getLink('coinRef', {
            queries: {
              coinRefId: coinRef.id,
            },
          }),
        },
        {
          label: `${coinRef.catalog.country.name} ${coinRef.denomination},  ${coin.year}`,
          current: true,
        },
      ]}
    />
    <CoinHeaderContainer
      id={coinRef.id}
      title={`${coinRef.catalog.country.name} ${coinRef.denomination},  ${coin.year}`}
    />
    <Grid
      type="container"
      cols={{
        default: 12,
      }}
      columnGap={{
        default: 32,
      }}
    >
      <Grid
        type="item"
        cols={{
          default: 12,
          xl: 8,
        }}
        css={{
          rowGap: '$32',
        }}
      >
        <Grid
          type="container"
          cols={{
            default: 1,
            md: 2,
            xl: 1,
            '2xl': 2,
          }}
          columnGap={{
            default: 24,
          }}
          rowGap={{
            default: 24,
          }}
        >
          <Card
            paddingHorizontal={{
              default: 32,
            }}
            paddingVertical={{
              default: 24,
            }}
            css={{
              rowGap: '$16',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CoinImageContainer>
              <img src="https://fr.numista.com/catalogue/photos/allemagne/1384-180.jpg" />
            </CoinImageContainer>
            <Infos
              data={[
                {
                  label: 'Graveur',
                  value: 'Aucun',
                },
                {
                  label: 'Description',
                  value:
                    'Magna ad exercitation excepteur commodo adipisicing voluptate magna minim elit.',
                },
              ]}
            />
          </Card>
          <Card
            paddingHorizontal={{
              default: 32,
            }}
            paddingVertical={{
              default: 24,
            }}
            css={{
              rowGap: '$16',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CoinImageContainer>
              <img src="https://fr.numista.com/catalogue/photos/allemagne/1383-180.jpg" />
            </CoinImageContainer>
            <Infos
              data={[
                {
                  label: 'Graveur',
                  value: 'Aucun',
                },
                {
                  label: 'Description',
                  value:
                    'Magna ad exercitation excepteur commodo adipisicing voluptate magna minim elit.',
                },
              ]}
            />
          </Card>
        </Grid>
        <Card
          paddingHorizontal={{
            default: 32,
          }}
          paddingVertical={{
            default: 24,
          }}
          css={{
            rowGap: '$16',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Title as="h2">Informations</Title>
          <Infos
            data={[
              {
                label: 'Référence',
                value: 'KM#123',
              },
              {
                label: 'Pays',
                value: 'France',
              },
              {
                label: 'Dénomination',
                value: '2 euros',
              },
              {
                label: 'Année',
                value: '2019',
              },
              {
                label: 'Période',
                value: 'République',
              },
              {
                label: 'Type de pièce',
                value: 'Pièce de monnaie',
              },
              {
                label: 'Composition',
                value: 'Argent',
              },
              {
                label: 'Type de tranche',
                value: 'Tranche',
              },
              {
                label: 'Forme',
                value: 'Ronde',
              },
              {
                label: 'Alignement',
                value: 'Aucun',
              },
              {
                label: 'Poids',
                value: '8,5 g',
              },
              {
                label: 'Diamètre',
                value: '25,75 mm',
              },
              {
                label: 'Épaisseur',
                value: '1,85 mm',
              },
            ]}
          />
        </Card>
        <Card
          paddingHorizontal={{
            default: 32,
          }}
          paddingVertical={{
            default: 24,
          }}
          css={{
            rowGap: '$16',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {' '}
          <Title as="h2">Frappe</Title>
          <Table
            columns={[
              {
                accessorKey: 'year',
                header: 'Year',
              },
              {
                accessorKey: 'mintage',
                header: 'Mintage',
                columns: [
                  {
                    accessorKey: 'unc',
                    header: 'UNC',
                  },
                  {
                    accessorKey: 'bu',
                    header: 'BU',
                  },
                  {
                    accessorKey: 'prf',
                    header: 'PRF',
                  },
                ],
              },
              {
                accessorKey: 'price',
                header: 'Price',
              },
            ]}
            data={[
              {
                year: '2019',
                unc: '1',
                bu: '2',
                prf: '3',
                price: '4',
              },
            ]}
            fullWidth
            css={{
              thSpan: {
                justifyContent: 'center',
              },
              tdContent: {
                justifyContent: 'center',
              },
            }}
          />
        </Card>
      </Grid>

      <Grid
        type="item"
        cols={{
          default: 12,
          xl: 4,
        }}
        css={{
          rowGap: '$24',
        }}
      >
        <Card
          paddingHorizontal={{
            default: 32,
          }}
          paddingVertical={{
            default: 24,
          }}
        >
          <Title as="h2">Variété</Title>
        </Card>
        <Card
          paddingHorizontal={{
            default: 32,
          }}
          paddingVertical={{
            default: 24,
          }}
        >
          <Title as="h2">Ma Collection</Title>

          <Button>+ Ajouter à ma collection</Button>
        </Card>
        <Card
          paddingHorizontal={{
            default: 32,
          }}
          paddingVertical={{
            default: 24,
          }}
        >
          <Title as="h2">Echanger</Title>
        </Card>
      </Grid>
    </Grid>
  </>
);
