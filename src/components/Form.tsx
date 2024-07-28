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
    domRef,
    formRef,
    children,
    render,
    debug,
    ...rest
  } = props;

  return (
    <FormProvider<T>
      formRef={formRef}
      initialValues={initialValues}
      validateOnSubmit={validateOnSubmit}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      schemaValidation={schemaValidation}
      onChange={onChange}
      onSubmit={onSubmit}
      debug={debug}
      render={(context) => (
        <form {...rest} ref={domRef} onSubmit={context.onSubmit} onReset={context.reset}>
          {render ? render(context) : children}
        </form>
      )}
    />
  );
};

export default Form;
