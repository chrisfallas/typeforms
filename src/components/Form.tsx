import FormContext from '../contexts/FormContext';
import ValidationsContext from '../contexts/ValidationsContext';
import useFormHandler from '../hooks/useFormHandler';
import useValidationsHandler from '../hooks/useValidationsHandler';
import { FormComponent, FormProps } from '../types/Form';

const Form: FormComponent = <T extends Record<number, any> = Record<number, any>>({
  domRef,
  formRef,
  initialValues,
  onChange,
  onSubmit,
  onReset,
  validations,
  validateOnMount,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
  render,
  children,
  ...rest
}: FormProps<T>) => {
  const validationsContext = useValidationsHandler<T>({
    validations,
    validateOnMount,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  });

  const formContext = useFormHandler<T>(validationsContext, {
    formRef,
    initialValues,
    onChange,
    onSubmit,
    onReset,
  });

  const { submit, reset } = formContext;

  return (
    <ValidationsContext.Provider value={validationsContext}>
      <FormContext.Provider value={formContext}>
        <form ref={domRef} onSubmit={submit} onReset={reset} {...rest}>
          {render ? render(formContext) : children}
        </form>
      </FormContext.Provider>
    </ValidationsContext.Provider>
  );
};

export default Form;
