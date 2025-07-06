import { Child } from './Global';
import { CustomTextFieldProps } from './TextField';
import { CustomTextAreaProps } from './TextArea';
import { CustomNumericFieldProps } from './NumericField';
import { CustomCheckboxProps } from './Checkbox';
import { CustomSelectProps } from './Select';

export type TypeFormsSettings = {
  customTextField?: <P extends CustomTextFieldProps = CustomTextFieldProps>(
    props: P,
  ) => Child;
  customTextArea?: <P extends CustomTextAreaProps = CustomTextAreaProps>(
    props: P,
  ) => Child;
  customNumericField?: <P extends CustomNumericFieldProps = CustomNumericFieldProps>(
    props: P,
  ) => Child;
  customCheckbox?: <P extends CustomCheckboxProps = CustomCheckboxProps>(
    props: P,
  ) => Child;
  customSelect?: <P extends CustomSelectProps = CustomSelectProps>(props: P) => Child;
};
