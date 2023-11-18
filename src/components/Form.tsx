import FormProvider from '../providers/FormProvider';
import { FormProps } from '../types/Form';

const Form = <T extends Record<string, any> = Record<string, any>>(
  props: FormProps<T>,
) => {
  const { children, ...rest } = props;
  return (
    <FormProvider<T> {...rest}>
      <form {...rest}>{children}</form>
    </FormProvider>
  );
};

export default Form;
