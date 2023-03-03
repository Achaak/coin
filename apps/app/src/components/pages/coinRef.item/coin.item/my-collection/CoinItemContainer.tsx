import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { EditIcon } from '@my-coin/ui/dist/icons/Edit';
import { TrashIcon } from '@my-coin/ui/dist/icons/Trash';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo, useState } from 'react';
import { Card } from '../../../../global/Card';
import { Coin } from '../../../../../selector/coin';
import { trpc } from '../../../../../utils/trpc';
import { AddCoinInCollectionDialog } from '../../../../global/Dialogs/CoinInCollection';
import { styled } from '@my-coin/ui';
import { UserCoin } from '../../../../../selector/userCoin';
import { Infos } from '../../../../global/Infos';
import { DropdownMenu } from '@my-coin/ui/dist/components/dropdownMenu/index';
import { ValidateDialog } from '@my-coin/ui/dist/components/dialog/validate/index';
import { CoinImages } from '../../../../global/CoinImages';

const List = styled('ul', {
  rowGap: '$32',
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '$8',
  width: '100%',
});

type CoinItemContainerProps = {
  coin: Coin;
};

export const CoinItemMyCollectionContainer: FC<CoinItemContainerProps> = ({
  coin,
}) => {
  const [isAddCoinInCollectionDialogOpen, setIsAddCoinInCollectionDialogOpen] =
    useState(false);

  const { mutate: addUserCoinMutation, isLoading: addUserCoinIsLoading } =
    trpc.userCoin.add.useMutation({
      onSuccess: async () => {
        await refetchUserCoins();
        setIsAddCoinInCollectionDialogOpen(false);
      },
    });

  const {
    data: userCoins,
    isLoading: userCoinsIsLoading,
    refetch: refetchUserCoins,
  } = trpc.userCoin.byCoinId.useQuery({
    coinId: coin.id,
  });

  const userCoinList = useMemo(() => {
    if (userCoinsIsLoading) {
      return <div>Chargement...</div>;
    }

    if (userCoins?.length === 0) {
      return <div>Aucun élément</div>;
    }

    return userCoins?.map((userCoin) => (
      <CoinItemMyCollectionItem
        key={userCoin.id}
        userCoin={userCoin}
        refetchUserCoins={async () => {
          await refetchUserCoins();
        }}
      />
    ));
  }, [userCoinsIsLoading, userCoins, refetchUserCoins]);

  return (
    <>
      <AddCoinInCollectionDialog
        visible={isAddCoinInCollectionDialogOpen}
        onClose={() => setIsAddCoinInCollectionDialogOpen(false)}
        validateButtonLabel="Ajouter"
        validateButtonLoading={addUserCoinIsLoading}
        onSubmit={async (value) => {
          await addUserCoinMutation({
            coinId: coin.id,
            comment: value.comment,
            condition: value.condition,
            exchangeable: value.exchangeable,
            price: value.price,
          });
        }}
      />

      <Card
        css={{
          rowGap: '$16',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Title as="h2">Ma Collection</Title>

        <Button
          onClick={() => setIsAddCoinInCollectionDialogOpen(true)}
          padding="sm"
          fontSize="em-small"
          width="auto"
        >
          Ajouter à ma collection
        </Button>

        <List>{userCoinList}</List>
      </Card>
    </>
  );
};

const Item = styled('li', {
  rowGap: '$8',
  display: 'flex',
  flexDirection: 'column',
});

const InfosContainer = styled('div', {
  rowGap: '$16',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const CommentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$4',
});

const ItemTop = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  borderRadius: '$xl',
  columnGap: '$16',
});

const Comment = styled('p', {
  color: '$gray-darker',
});

type CoinItemMyCollectionItemProps = {
  userCoin: UserCoin;
  refetchUserCoins: () => Promise<void>;
};

const CoinItemMyCollectionItem: FC<CoinItemMyCollectionItemProps> = ({
  userCoin,
  refetchUserCoins,
}) => {
  const [validateDialogIsOpen, setValidateDialogIsOpen] = useState(false);
  const [editUserCoinDialogIsOpen, setEditUserCoinDialogIsOpen] =
    useState(false);

  const { mutate: deleteUserCoinMutation, isLoading: deleteUserCoinIsLoading } =
    trpc.userCoin.remove.useMutation({
      onSuccess: async () => {
        await refetchUserCoins();
        setValidateDialogIsOpen(false);
      },
    });

  const { mutate: editUserCoinMutation, isLoading: editUserCoinIsLoading } =
    trpc.userCoin.update.useMutation({
      onSuccess: async () => {
        await refetchUserCoins();
        setEditUserCoinDialogIsOpen(false);
      },
    });

  return (
    <>
      <ValidateDialog
        visible={validateDialogIsOpen}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir supprimer cet élément ?"
        validateButtonLabel="Supprimer"
        validateButtonLoading={deleteUserCoinIsLoading}
        validateButtonColorName="danger"
        cancelButtonColorName="gray"
        onValidate={async () => {
          await deleteUserCoinMutation({
            id: userCoin.id,
          });
        }}
        onCancel={() => setValidateDialogIsOpen(false)}
      />

      <AddCoinInCollectionDialog
        visible={editUserCoinDialogIsOpen}
        onClose={() => setEditUserCoinDialogIsOpen(false)}
        validateButtonLabel="Ajouter"
        validateButtonLoading={editUserCoinIsLoading}
        onSubmit={async (value) => {
          await editUserCoinMutation({
            id: userCoin.id,
            comment: value.comment,
            condition: value.condition,
            exchangeable: value.exchangeable,
            price: value.price,
          });
        }}
        defaultValues={{
          comment: userCoin.comment,
          condition: userCoin.condition,
          exchangeable: userCoin.exchangeable,
          price: userCoin.price,
        }}
      />

      <Item>
        <ItemTop>
          <CoinImages
            observeImage={userCoin.observeImage}
            reverseImage={userCoin.reverseImage}
          />
          <InfosContainer>
            <Infos
              data={[
                {
                  label: 'État',
                  value: userCoin.condition,
                },
                {
                  label: 'Prix',
                  value: `${userCoin.price ?? '--'} €`,
                },
                {
                  label: 'Échangeable',
                  value: userCoin.exchangeable ? 'Oui' : 'Non',
                },
              ]}
            />
          </InfosContainer>
          <DropdownMenu
            data={[
              {
                items: [
                  {
                    label: 'Modifier',
                    type: 'item',
                    Icon: EditIcon,
                    onClick: () => setEditUserCoinDialogIsOpen(true),
                    colorName: 'warning',
                  },
                  {
                    label: 'Supprimer',
                    type: 'item',
                    Icon: TrashIcon,
                    onClick: () => setValidateDialogIsOpen(true),
                    colorName: 'danger',
                  },
                ],
              },
            ]}
          />
        </ItemTop>
        {userCoin.comment && (
          <CommentContainer>
            <Comment>{userCoin.comment}</Comment>
          </CommentContainer>
        )}
      </Item>
    </>
  );
};
