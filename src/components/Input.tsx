import { ChangeEvent, FocusEvent } from 'react';
import { InputComponent } from '../types/Input';
import { FieldContextValues } from '../types/FieldProvider';
import useFieldHandler from '../hooks/useFieldHandler';

const Input: InputComponent = (props) => {
  const {
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
  } = props;

  const {
    value = '',
    isValid,
    setValue,
    blur,
  }: FieldContextValues = useFieldHandler({
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
    const value = target.type === 'number' ? +target.value : target.value;
    setValue(value);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  return (
    <input
      ref={domRef}
      name={name}
      value={value}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default Input;
