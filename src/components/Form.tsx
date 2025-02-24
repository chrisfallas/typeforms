import FormProvider from '../providers/FormProvider';
import ValidationsProvider from '../providers/ValidationsProvider';
import { FormComponent } from '../types/Form';

const Form: FormComponent = ({
  initialValues,
  onChange,
  onSubmit,
  onReset,
  domRef,
  formRef,
  debug,
  validations,
  validateOnMount,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
  render,
  children,
  ...rest
}) => (
  <ValidationsProvider
    validations={validations}
    validateOnMount={validateOnMount}
    validateOnSubmit={validateOnSubmit}
    validateOnChange={validateOnChange}
    validateOnBlur={validateOnBlur}
  >
    <FormProvider
      formRef={formRef}
      initialValues={initialValues}
      onChange={onChange}
      onSubmit={onSubmit}
      onReset={onReset}
      debug={debug}
      render={(context) => (
        <form {...rest} ref={domRef} onSubmit={context.submit} onReset={context.reset}>
          {render ? render(context) : children}
        </form>
      )}
    />
  </ValidationsProvider>
);

export default Form;
