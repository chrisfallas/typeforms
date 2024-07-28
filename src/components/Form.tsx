import FormProvider from '../providers/FormProvider';
import { FormProps } from '../types/Form';
import { FormContextValues } from '../types/FormProvider';
import { RenderProp } from '../types/Global';

const Form = <T extends Record<string, any> = Record<string, any>>(
  props: FormProps<T> & RenderProp<FormContextValues<T>>,
) => {
  const {
    initialValues,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
    schemaValidation,
    onChange,
    onSubmit,
    children,
    render,
    debug,
    ...rest
  } = props;

  return (
    <FormProvider<T>
      initialValues={initialValues}
      validateOnSubmit={validateOnSubmit}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      schemaValidation={schemaValidation}
      onChange={onChange}
      onSubmit={onSubmit}
      debug={debug}
      render={(context) => (
        <form {...rest} onSubmit={context.onSubmit}>
          {render ? render(context) : children}
        </form>
      )}
    />
  );
};

export default Form;
