import FieldContext from '../contexts/FieldContext';
import useFieldHandler from '../hooks/useFieldHandler';
import { FieldComponent } from '../types/Field';

const Field: FieldComponent = ({ component, ...rest }) => {
  const fieldContext = useFieldHandler(rest);
  return (
    <FieldContext.Provider value={fieldContext}>
      {component?.(fieldContext)}
    </FieldContext.Provider>
  );
};

export default Field;
