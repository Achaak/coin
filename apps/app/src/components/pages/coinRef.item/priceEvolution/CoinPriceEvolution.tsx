import { FC, useMemo } from 'react';
import { Card } from '../../../global/Card';
import { Title } from '@my-coin/ui/dist/components/title/index';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { styled, useTheme } from '@my-coin/ui';
import { Select } from '@my-coin/ui/dist/components/inputs/select/index';
import { ClipLoader } from '@my-coin/ui/dist/core/pikas-ui/Loader';

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const Content = styled('div', {
  display: 'flex',
  position: 'relative',
});

const LoaderContainer = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$gray',
  zIndex: '$high',
  transition: 'opacity 0.2s ease-in-out',

  variants: {
    loading: {
      true: {
        opacity: 1,
        pointerEvents: 'all',
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
  },
});

const TooltipStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '$8',
  backgroundColor: '$white',
  borderRadius: '$xl',
  boxShadow: '$2xl',
});

const TooltipLabel = styled('span', {});

const TooltipValue = styled('span', {
  fontWeight: '$bold',
});

const dateFormat = new Intl.DateTimeFormat();

export type CoinPriceEvolutionPeriod = 7 | 30 | 90 | 180 | 365;
export type CoinPriceEvolutionData = {
  price: number;
  date: Date;
};

const addEmptyData = (data: CoinPriceEvolutionData[]) => {
  const allData = [];
  const dataFormatted = data.map((item) => ({
    price: item.price,
    date: new Date(new Date(item.date).setHours(0, 0, 0, 0)),
  }));

  for (let i = 0; i < dataFormatted.length; i++) {
    const item = dataFormatted[i];
    const nextItem = dataFormatted[i + 1];

    allData.push(item);

    if (nextItem) {
      const diff = nextItem.date.getTime() - item.date.getTime();
      const diffInDays = diff / (1000 * 3600 * 24);

      if (diffInDays > 1) {
        const emptyData = [];

        for (let j = 1; j < diffInDays; j++) {
          emptyData.push({
            price: item.price,
            date: new Date(item.date.getTime() + j * 1000 * 3600 * 24),
          });
        }

        allData.push(...emptyData);
      }
    }
  }

  return allData;
};

type CoinPriceEvolutionProps = {
  data: CoinPriceEvolutionData[];
  onPeriodChange: (period: CoinPriceEvolutionPeriod) => void;
  defaultPeriod: CoinPriceEvolutionPeriod;
  loading?: boolean;
};

export const CoinPriceEvolution: FC<CoinPriceEvolutionProps> = ({
  data,
  onPeriodChange,
  defaultPeriod,
  loading = true,
}) => {
  const theme = useTheme();

  const dataFormatted = useMemo(() => {
    const allData = addEmptyData(data);

    return allData.map((item) => ({
      price: item.price,
      date: dateFormat.format(item.date),
    }));
  }, [data]);

  if (!theme) {
    return null;
  }

  return (
    <Card
      css={{
        rowGap: '$16',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header>
        <Title as="h2">Evolution de prix</Title>
        <Select
          data={[
            {
              items: [
                {
                  label: '1 semaine',
                  value: '7',
                },
                {
                  label: '1 mois',
                  value: '30',
                },
                {
                  label: '3 mois',
                  value: '90',
                },
                {
                  label: '6 mois',
                  value: '180',
                },
                {
                  label: '1 an',
                  value: '365',
                },
              ],
            },
          ]}
          onChange={(value) =>
            onPeriodChange(parseInt(value) as CoinPriceEvolutionPeriod)
          }
          defaultValue={`${defaultPeriod}`}
          width="auto"
        />
      </Header>
      <Content>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            width={500}
            height={400}
            data={dataFormatted}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="price" />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <TooltipStyled>
                      <TooltipLabel>{`${label}`}</TooltipLabel>
                      <TooltipValue>{payload[0].value}€</TooltipValue>
                    </TooltipStyled>
                  );
                }

                return null;
              }}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke={theme.colors.primary.value}
              fill={theme.colors.primary.value}
            />
          </AreaChart>
        </ResponsiveContainer>
        <LoaderContainer loading={loading}>
          <ClipLoader colorName="primary" size={64} />
        </LoaderContainer>
      </Content>
    </Card>
  );
};
