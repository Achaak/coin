import { PikasColor, styled } from '@my-coin/ui';
import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { FC } from 'react';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
});

export type AddCoinInCollectionDialogFooterProps = {
  validateButtonLabel?: string;
  validateButtonColorName?: PikasColor;
  validateButtonLoading?: boolean;
};

export const AddCoinInCollectionDialogFooter: FC<
  AddCoinInCollectionDialogFooterProps
> = ({
  validateButtonLabel,
  validateButtonColorName,
  validateButtonLoading,
}) => (
  <Container>
    <Button
      width="auto"
      colorName={validateButtonColorName}
      loading={validateButtonLoading}
      form="add-coin-in-collection-form"
      type="submit"
    >
      {validateButtonLabel}
    </Button>
  </Container>
);
