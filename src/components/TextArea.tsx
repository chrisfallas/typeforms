import { ChangeEvent, createElement, FocusEvent } from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';
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
  const fieldHandler = useFieldHandler({
    fieldRef,
    name,
    validation,
    validateOnMount,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  });

  const { value, isValid, setValue, blur } = fieldHandler;

  const settings = useSettingsContext();

  const onChangeHandler = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    await setValue(event.target.value);
    onChange?.(event);
  };

  const onBlurHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
    blur();
    onBlur?.(event);
  };

  if (settings?.customTextArea) {
    return createElement(settings.customTextArea, {
      domRef,
      fieldContext: fieldHandler,
      ...rest,
    });
  }

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
