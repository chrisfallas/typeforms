import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { BasicDataTypes, KeyOf } from '../types/Global';
import { InputComponent, InputProps } from '../types/Input';

const Input: InputComponent = <K extends KeyOf = KeyOf, V = any>({
  domRef,
  fieldRef,
  type,
  name,
  onChange,
  onBlur,
  validation,
  validateOnMount,
  validateOnSubmit,
  validateOnChange,
  validateOnBlur,
  ...rest
}: InputProps<K, V>) => {
  const {
    value = '',
    isValid,
    setValue,
    blur,
  } = useFieldHandler<K, V>({
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
    let value: BasicDataTypes = target.value;
    if (target.type === 'number' || target.type === 'range') value = +target.value;
    if (target.type === 'checkbox') value = target.checked;
    setValue(value as V);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  return (
    <input
      ref={domRef}
      type={type as HTMLInputTypeAttribute}
      name={name}
      value={String(value)}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default Input;
