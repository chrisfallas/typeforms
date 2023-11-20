import FormProvider from '../providers/FormProvider';
import { FormProps } from '../types/Form';

const Form = <T extends Record<string, any> = Record<string, any>>(
  props: FormProps<T>,
) => {
  const { initialValues, schemaValidation, onChange, onSubmit, children, id, ...rest } =
    props;
  return (
    <FormProvider<T>
      customFormId={id}
      initialValues={initialValues}
      schemaValidation={schemaValidation}
      onChange={onChange}
      onSubmit={onSubmit}
      render={({ formId, onSubmit }) => (
        <form id={formId} onSubmit={onSubmit} {...rest}>
          {children}
        </form>
      )}
    />
  );
};

export default Form;
