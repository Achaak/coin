import { styled } from '@my-coin/ui';
import { Textfield } from '@my-coin/ui/dist/components/inputs/textfield/index';
import { Textarea } from '@my-coin/ui/dist/components/inputs/textarea/index';
import { Switch } from '@my-coin/ui/dist/components/inputs/switch/index';
import { Select } from '@my-coin/ui/dist/components/inputs/select/index';
import { FC, useEffect } from 'react';
import { coinCondition } from '../../../../../utils/PrismaEnum';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddCoinInCollectionDialogContentFormValues } from '../CoinInCollectionDialog';

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  color: '$black',
  rowGap: '$16',
});

export type AddCoinInCollectionDialogContentProps = {
  defaultValues: AddCoinInCollectionDialogContentFormValues;
  onSubmit: (values: AddCoinInCollectionDialogContentFormValues) => void;
};

export const AddCoinInCollectionDialogContent: FC<
  AddCoinInCollectionDialogContentProps
> = ({ defaultValues, onSubmit }) => {
  const {
    errors,
    initialValues,
    handleSubmit,
    setFieldValue,
    submitCount,
    resetForm,
  } = useFormik<AddCoinInCollectionDialogContentFormValues>({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      condition: Yup.string().required('Required'),
      comment: Yup.string()
        .max(255, 'Must be 255 characters or less')
        .nullable(),
      price: Yup.number().positive('Must be positive').nullable(),
      exchangeable: Yup.boolean(),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    resetForm({ values: defaultValues });
  }, [defaultValues, resetForm]);

  return (
    <Form id="add-coin-in-collection-form" onSubmit={handleSubmit}>
      <Select
        label="Condition"
        data={[
          {
            items: Object.keys(coinCondition).map((key) => ({
              label: key,
              value: key,
            })),
          },
        ]}
        backgroundColorName="gray"
        defaultValue={initialValues.condition}
        onChange={(value) => {
          void setFieldValue('condition', value);
        }}
        textError={submitCount > 0 ? errors.condition : undefined}
      />
      <Textarea
        label="Comment"
        backgroundColorName="gray"
        resize="none"
        placeholder="Write a comment about this coin"
        defaultValue={initialValues.comment ?? undefined}
        onChange={(e) => {
          void setFieldValue('comment', e.target.value);
        }}
        textError={submitCount > 0 ? errors.comment : undefined}
      />
      <Textfield
        label="Price"
        backgroundColorName="gray"
        type="number"
        placeholder="-.--"
        rightChildren="$"
        defaultValue={initialValues.price ?? undefined}
        onChange={(e) => {
          void setFieldValue('price', parseInt(e.target.value) ?? undefined);
        }}
        textError={submitCount > 0 ? errors.price : undefined}
      />
      <Switch
        label="Exchangeable"
        defaultChecked={initialValues.exchangeable}
        onCheckedChange={(value) => {
          void setFieldValue('exchangeable', value);
        }}
        textError={submitCount > 0 ? errors.exchangeable : undefined}
      />
    </Form>
  );
};
