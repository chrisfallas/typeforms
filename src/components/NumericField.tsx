import Input from './Input';
import { NumericFieldComponent } from '../types/NumericField';

const NumericField: NumericFieldComponent = ({ type = 'number', ...rest }) => (
  <Input type={type} {...rest} />
);

export default NumericField;
