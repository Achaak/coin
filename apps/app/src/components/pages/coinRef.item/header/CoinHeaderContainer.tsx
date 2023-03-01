import { styled } from '@my-coin/ui';
import { FC, useCallback, useMemo } from 'react';
import { HeartIcon } from '@my-coin/ui/dist/icons/Heart';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { HeartSolidIcon } from '@my-coin/ui/dist/icons/HeartSolid';
import { useSession } from 'next-auth/react';
import { ClipLoader } from '@my-coin/ui/dist/core/pikas-ui/Loader';

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

const LoaderContainer = styled('div', {
  display: 'flex',
});

type CoinHeaderContainerProps = {
  title: string;
  price: number;
  isFavorite: boolean;
  id: string;
  onAddOrRemoveToFavorites: (id: string) => void;
  isLoadingAddOrRemoveToFavorites: boolean;
};

export const CoinHeaderContainer: FC<CoinHeaderContainerProps> = ({
  id,
  title,
  price,
  isFavorite,
  onAddOrRemoveToFavorites,
  isLoadingAddOrRemoveToFavorites,
}) => {
  const { status } = useSession();

  const handleAddOrRemoveToFavorites = useCallback(async () => {
    await onAddOrRemoveToFavorites(id);
  }, [id, onAddOrRemoveToFavorites]);

  const favoriteContent = useMemo(() => {
    if (status === 'unauthenticated') {
      return null;
    }

    if (isLoadingAddOrRemoveToFavorites) {
      return (
        <LoaderContainer>
          <ClipLoader size={32} colorName="primary" />
        </LoaderContainer>
      );
    }

    if (isFavorite) {
      return (
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
      );
    }

    return (
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
    );
  }, [
    status,
    isLoadingAddOrRemoveToFavorites,
    isFavorite,
    handleAddOrRemoveToFavorites,
  ]);

  return (
    <Header>
      <HeaderLeft>
        {favoriteContent}
        <Title as="h1">{title}</Title>
      </HeaderLeft>

      <Price>
        Prix <span>{price}</span>
      </Price>
    </Header>
  );
};
