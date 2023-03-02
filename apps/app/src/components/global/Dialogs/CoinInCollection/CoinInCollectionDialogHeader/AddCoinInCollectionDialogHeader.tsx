import { styled } from '@my-coin/ui';
import { DialogTitle } from '@my-coin/ui/dist/components/dialog/custom/index';
import { FC } from 'react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const AddCoinInCollectionDialogHeader: FC = () => (
  <Container>
    <DialogTitle>Add a coin in your collection</DialogTitle>
  </Container>
);
