import { ChangeEvent, FocusEvent } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { TextAreaComponent } from '../types/TextArea';

const TextArea: TextAreaComponent = ({
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
      value={String(value ?? '')}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default TextArea;
