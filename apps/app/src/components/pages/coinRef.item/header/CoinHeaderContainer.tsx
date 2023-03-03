import { styled } from '@my-coin/ui';
import { FC, useCallback, useMemo } from 'react';
import { HeartIcon } from '@my-coin/ui/dist/icons/Heart';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { HeartSolidIcon } from '@my-coin/ui/dist/icons/HeartSolid';
import { useSession } from 'next-auth/react';
import { ClipLoader, PulseLoader } from '@my-coin/ui/dist/core/pikas-ui/Loader';
import Image from 'next/image';

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

const ImageContainer = styled('div', {
  borderRadius: '$lg',
  overflow: 'hidden',
  display: 'flex',
});

type CoinHeaderContainerProps = {
  title: string;
  price: number | null;
  priceLoading: boolean;
  isFavorite: boolean;
  id: string;
  onAddOrRemoveToFavorites: (id: string) => void;
  isLoadingAddOrRemoveToFavorites: boolean;
  countryCode: string;
};

export const CoinHeaderContainer: FC<CoinHeaderContainerProps> = ({
  id,
  title,
  price,
  priceLoading,
  isFavorite,
  onAddOrRemoveToFavorites,
  isLoadingAddOrRemoveToFavorites,
  countryCode,
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

  const priceContent = useMemo(() => {
    if (priceLoading) {
      return <PulseLoader size={6} colorName="primary" />;
    }

    return price ?? '--';
  }, [priceLoading, price]);

  return (
    <Header>
      <HeaderLeft>
        {favoriteContent}
        <ImageContainer>
          <Image
            src={`/flags/${countryCode}.svg`}
            height={32}
            width={32}
            alt="Logo My Coin"
          />
        </ImageContainer>
        <Title as="h1">{title}</Title>
      </HeaderLeft>

      <Price>
        Prix <span>{priceContent}€</span>
      </Price>
    </Header>
  );
};
