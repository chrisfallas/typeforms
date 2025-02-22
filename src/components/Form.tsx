import FormProvider from '../providers/FormProvider';
import { FormComponent } from '../types/Form';

const Form: FormComponent = ({
  initialValues,
  onChange,
  onSubmit,
  onReset,
  domRef,
  formRef,
  debug,
  render,
  children,
  ...rest
}) => (
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
);

export default Form;
