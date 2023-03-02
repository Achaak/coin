import { FC } from 'react';
import { CustomDialog } from '@my-coin/ui/dist/components/dialog/custom/index';
import type { DialogProps } from '@my-coin/ui/dist/components/dialog/custom';
import { AddCoinInCollectionDialogHeader } from './CoinInCollectionDialogHeader';
import { AddCoinInCollectionDialogContent } from './CoinInCollectionDialogContent';
import { AddCoinInCollectionDialogFooter } from './CoinInCollectionDialogFooter';
import { PikasColor } from '@my-coin/ui';
import { CoinCondition } from '@my-coin/database';

export type AddCoinInCollectionDialogContentFormValues = {
  condition: CoinCondition;
  comment: string | null;
  price: number | null;
  exchangeable: boolean;
};

type AddCoinInCollectionDialogProps = DialogProps & {
  defaultValues?: AddCoinInCollectionDialogContentFormValues;
  onSubmit: (values: AddCoinInCollectionDialogContentFormValues) => void;
  validateButtonLabel?: string;
  validateButtonColorName?: PikasColor;
  validateButtonDisabled?: boolean;
  validateButtonLoading?: boolean;
};

export const AddCoinInCollectionDialog: FC<AddCoinInCollectionDialogProps> = ({
  defaultValues = {
    condition: 'PRF',
    exchangeable: false,
    comment: null,
    price: null,
  },
  onClose,
  validateButtonLabel = 'Ok',
  validateButtonColorName = 'primary',
  validateButtonLoading,
  onSubmit,
  ...props
}) => (
  <CustomDialog
    onClose={onClose}
    header={<AddCoinInCollectionDialogHeader />}
    content={
      <AddCoinInCollectionDialogContent
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    }
    footer={
      <AddCoinInCollectionDialogFooter
        validateButtonLabel={validateButtonLabel}
        validateButtonColorName={validateButtonColorName}
        validateButtonLoading={validateButtonLoading}
      />
    }
    padding={{
      container: 'no-padding',
      content: 'sm',
      footer: 'sm',
      header: 'sm',
    }}
    gap={{
      container: 'no-gap',
      content: 'md',
      footer: 'md',
      header: 'md',
    }}
    css={{
      header: {
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: '$gray-light',
      },
      footer: {
        paddingTop: 0,
      },
    }}
    {...props}
  />
);
