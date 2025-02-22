import { FormComponent } from './Form';
import { FieldComponent } from './Field';
import { InputComponent } from './Input';

interface TypeFormReturn<T extends Record<string, any>> {
  Form: FormComponent<T>;
  Field: FieldComponent<T>;
  Input: InputComponent<T>;
}

export default TypeFormReturn;
