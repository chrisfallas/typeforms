import FieldContext from '../contexts/FieldContext';
import useFieldHandler from '../hooks/useFieldHandler';
import { KeyOf } from '../types/Global';
import { FieldComponent, FieldProps } from '../types/Field';

const Field: FieldComponent = <K extends KeyOf = KeyOf, V = any>({
  component,
  children,
  ...rest
}: FieldProps<K, V>) => {
  const fieldContext = useFieldHandler<K, V>(rest);
  return (
    <FieldContext.Provider value={fieldContext}>
      {component ? component(fieldContext) : children}
    </FieldContext.Provider>
  );
};

export default Field;
