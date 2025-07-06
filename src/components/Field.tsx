import FieldContext from '../contexts/FieldContext';
import useFieldHandler from '../hooks/useFieldHandler';
import { FieldComponent } from '../types/Field';

const Field: FieldComponent = ({ component, ...rest }) => {
  const fieldHandler = useFieldHandler(rest);
  return (
    <FieldContext.Provider value={fieldHandler}>
      {component?.(fieldHandler)}
    </FieldContext.Provider>
  );
};

export default Field;
