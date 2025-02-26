import { ChangeEvent, FocusEvent } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { KeyOf } from '../types/Global';
import { TextFieldComponent, TextFieldProps } from '../types/TextField';

const TextField: TextFieldComponent = <K extends KeyOf = KeyOf>({
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
}: TextFieldProps<K>) => {
  const {
    value = '',
    isValid,
    setValue,
    blur,
  } = useFieldHandler<K, string>({
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
    setValue(target.value);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  return (
    <input
      ref={domRef}
      name={name}
      value={String(value)}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default TextField;
