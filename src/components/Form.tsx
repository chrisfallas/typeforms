import FormProvider, { FormProviderProps } from '../providers/FormProvider';
import { PropsWithChildren } from 'react';

export interface FormProps<T extends Record<string, any> = Record<string, any>>
  extends FormProviderProps<T> {}

const Form = <T extends Record<string, any> = Record<string, any>>(
  props: PropsWithChildren<FormProps<T>>,
) => {
  return <FormProvider<T> {...props} />;
};

export default Form;
