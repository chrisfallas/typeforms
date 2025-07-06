import { useMemo, ChangeEvent, FocusEvent, createElement } from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';
import useFieldHandler from '../hooks/useFieldHandler';
import { TextFieldComponent } from '../types/TextField';

const TextField: TextFieldComponent = ({
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
    if (rest.type !== 'checkbox' && rest.type !== 'radio') return undefined;
    return value === rest.value;
  }, [value, rest.value]);

  const onChangeHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await setValue(event.target.value);
    onChange?.(event);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

  if (settings?.customTextField) {
    return createElement(settings.customTextField, {
      domRef,
      fieldContext: fieldHandler,
      checked,
      ...rest,
    });
  }

  return (
    <input
      ref={domRef}
      name={name}
      value={value ?? ''}
      checked={checked}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    />
  );
};

export default TextField;
