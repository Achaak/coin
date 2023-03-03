import { PikasCSS, styled } from '@my-coin/ui';
import { PulseLoader } from '@my-coin/ui/dist/core/pikas-ui/Loader';
import type { FC, ReactNode } from 'react';

const Container = styled('div', {
  backgroundColor: '$gray',
  borderRadius: '$3xl',
  rowGap: '$8',
  display: 'flex',
  flexDirection: 'column',
});

const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  columnGap: '$16',
});

const RowLeft = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'start',
});

const RowRight = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Label = styled('span', {
  fontWeight: '$medium',
});

const Value = styled('span', {
  textAlign: 'right',
});

export type InfosData = {
  label: string;
  value: ReactNode;
  loading?: boolean;
};

export type InfosProps = {
  css?: PikasCSS;
  data: InfosData[];
};

export const Infos: FC<InfosProps> = ({ css, data }) => (
  <Container
    css={{
      ...css,
    }}
  >
    {data.map((item) => (
      <Row>
        <RowLeft>
          <Label>{item.label}</Label>
        </RowLeft>
        <RowRight>
          <Value>
            {item.loading ? (
              <PulseLoader size={6} colorName="primary" />
            ) : (
              item.value
            )}
          </Value>
        </RowRight>
      </Row>
    ))}
  </Container>
);
