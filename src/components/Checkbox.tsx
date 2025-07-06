import { ChangeEvent, createElement, FocusEvent } from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';
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

  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await setValue(event.target.checked);
    onChange?.(event);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  if (settings?.customCheckbox) {
    return createElement(settings.customCheckbox, {
      domRef,
      fieldContext: fieldHandler,
      ...rest,
    });
  }

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
