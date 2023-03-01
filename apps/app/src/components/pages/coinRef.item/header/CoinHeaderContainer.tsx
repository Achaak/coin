import { styled } from '@my-coin/ui';
import { FC } from 'react';
import { HeartIcon } from '@my-coin/ui/dist/icons/Heart';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { HeartSolidIcon } from '@my-coin/ui/dist/icons/HeartSolid';

const Header = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  columnGap: '$16',
  width: '100%',
});

const HeaderLeft = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  columnGap: '$16',
});

const Price = styled('span', {
  borderColor: '$primary',
  borderWidth: '$2',
  borderStyle: 'solid',
  borderRadius: '$3xl',
  padding: '$4 $16',

  span: {
    fontWeight: '$bold',
    fontSize: '$em-large',
  },
});

type CoinHeaderContainerProps = {
  title: string;
  price: number;
  isFavorite: boolean;
  id: string;
};

export const CoinHeaderContainer: FC<CoinHeaderContainerProps> = ({
  id,
  title,
  price,
  isFavorite,
}) => {
  const handleAddOrRemoveToFavorites = () => {
    console.log('add to favorites');
  };

  return (
    <Header>
      <HeaderLeft>
        {isFavorite ? (
          <HeartSolidIcon
            size={32}
            colorName="danger"
            onClick={handleAddOrRemoveToFavorites}
            css={{
              container: {
                cursor: 'pointer',
              },
            }}
          />
        ) : (
          <HeartIcon
            size={32}
            colorName="black"
            onClick={handleAddOrRemoveToFavorites}
            css={{
              container: {
                cursor: 'pointer',
              },
            }}
          />
        )}
        <Title as="h1">{title}</Title>
      </HeaderLeft>

      <Price>
        Prix <span>{price}</span>
      </Price>
    </Header>
  );
};
