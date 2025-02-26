import { ChangeEvent, FocusEvent } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { KeyOf } from '../types/Global';
import { TextAreaComponent, TextAreaProps } from '../types/TextArea';

const TextArea: TextAreaComponent = <K extends KeyOf = KeyOf>({
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
}: TextAreaProps<K>) => {
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

  const onChangeHandler = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(target.value);
  };

  const onBlurHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
    blur();
    onBlur?.(event);
  };

  return (
    <textarea
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

export default TextArea;
