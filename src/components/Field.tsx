import { FieldComponent } from '../types/Field';
import FieldProvider from '../providers/FieldProvider';

const Field: FieldComponent = (props) => <FieldProvider {...props} />;

export default Field;
