import { ChangeEvent, FocusEvent } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { CheckboxComponent } from '../types/Checkbox';

const Checkbox: CheckboxComponent = ({
  domRef,
  fieldRef,
  name,
  onChange,
  onBlur,
  validation,
  validateOnMount,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
  ...rest
}) => {
  const { value, isValid, setValue, blur } = useFieldHandler({
    fieldRef,
    name,
    onChange,
    validation,
    validateOnMount,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  });

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.checked);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  return (
    <input
      ref={domRef}
      type="checkbox"
      name={name}
      checked={value ?? false}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default Checkbox;
