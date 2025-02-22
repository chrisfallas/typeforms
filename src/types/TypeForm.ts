import { FormComponent } from './Form';
import { FieldComponent } from './Field';

interface TypeFormReturn<T extends Record<string, any>> {
  Form: FormComponent<T>;
  Field: FieldComponent<T>;
}

export default TypeFormReturn;
