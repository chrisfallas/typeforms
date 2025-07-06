import { ChangeEvent, createElement, FocusEvent, useMemo } from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';
import useFieldHandler from '../hooks/useFieldHandler';
import { NumericFieldComponent } from '../types/NumericField';

const NumericField: NumericFieldComponent = ({
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

  const checked = useMemo(() => {
    if (rest.type !== 'radio') return undefined;
    return value === rest.value;
  }, [value, rest.value]);

  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await setValue(+event.target.value);
    onChange?.(event);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  if (settings?.customNumericField) {
    return createElement(settings.customNumericField, {
      domRef,
      fieldContext: fieldHandler,
      checked,
      ...rest,
    });
  }

  return (
    <input
      ref={domRef}
      type="number"
      name={name}
      value={value ? +value : ''}
      checked={checked}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default NumericField;
