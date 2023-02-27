import { styled } from '@my-coin/ui';
import { IconProps } from '@my-coin/ui/dist/core/pikas-ui/Icons';
import type { FC, ReactNode } from 'react';
import { Card, CardPaddingHorizontal, CardPaddingVertical } from '../Card/Card';

const Left = styled('div', {
  display: 'flex',
});

const Right = styled('div', {
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
};

export const CardStat: FC<CardProps> = ({
  Icon,
  value,
  label,
  paddingHorizontal,
  paddingVertical,
}) => (
  <Card
    paddingHorizontal={paddingHorizontal}
    paddingVertical={paddingVertical}
    css={{
      display: 'flex',
      alignItems: 'center',
      columnGap: '$16',
    }}
  >
    <Left>
      <IconContainer>
        <Icon colorName="primary" size={24} />
      </IconContainer>
    </Left>
    <Right>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Right>
  </Card>
);
