import {
  FieldValues,
  FormState,
  useForm as originalUseForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

export function shouldBeDisabledButton<T extends FieldValues>({
  isSubmitting,
  isValid,
}: FormState<T>) {
  return isSubmitting || !isValid
}

export function useFormCustom<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext> {
  return originalUseForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    ...props,
  })
}
