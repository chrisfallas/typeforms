import { FormComponent } from './Form';
import { FieldComponent } from './Field';
import { InputComponent } from './Input';
import { ErrorComponent } from './Error';

interface TypeFormReturn<T extends Record<string, any>> {
  Form: FormComponent<T>;
  Field: FieldComponent<T>;
  Input: InputComponent<T>;
  Error: ErrorComponent<T>;
}

export default TypeFormReturn;
