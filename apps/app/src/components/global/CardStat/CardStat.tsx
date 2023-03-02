import { styled } from '@my-coin/ui';
import { IconProps } from '@my-coin/ui/dist/core/pikas-ui/Icons';
import type { FC, ReactNode } from 'react';
import { Card, CardPaddingHorizontal, CardPaddingVertical } from '../Card/Card';
import { PulseLoader } from '@my-coin/ui/dist/core/pikas-ui/Loader';

const Left = styled('div', {
  display: 'flex',
  columnGap: '$16',
});

const LeftStart = styled('div', {
  display: 'flex',
});

const LeftEnd = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$4',
});

const Value = styled('span', {
  color: '$black',
  fontSize: '$em-2x-large',
  fontWeight: '$bold',
});

const Label = styled('span', {
  color: '$gray-dark',
  fontSize: '$em-small',
});

const Right = styled('div', {
  display: 'flex',
});

const IconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$white',
  borderRadius: '$3xl',
  padding: '$16',
});

type CardProps = {
  Icon: FC<IconProps>;
  value: ReactNode;
  label: ReactNode;
  paddingHorizontal?: CardPaddingHorizontal;
  paddingVertical?: CardPaddingVertical;
  right?: ReactNode;
  loading?: boolean;
};

export const CardStat: FC<CardProps> = ({
  Icon,
  value,
  label,
  paddingHorizontal = {
    default: 8,
    md: 16,
    xl: 20,
  },
  paddingVertical = {
    default: 8,
    md: 16,
    xl: 20,
  },
  right,
  loading,
}) => (
  <Card
    paddingHorizontal={paddingHorizontal}
    paddingVertical={paddingVertical}
    css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: '$16',
    }}
  >
    <Left>
      <LeftStart>
        <IconContainer>
          <Icon colorName="primary" size={24} />
        </IconContainer>
      </LeftStart>
      <LeftEnd>
        <Value>{loading ? <PulseLoader size={8} /> : value}</Value>
        <Label>{label}</Label>
      </LeftEnd>
    </Left>
    {right && <Right>{right}</Right>}
  </Card>
);
