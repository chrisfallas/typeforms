import { useMemo, ChangeEventHandler, FocusEventHandler, createElement } from 'react';
import { useSettingsContext } from '../contexts/SettingsContext';
import useFieldHandler from '../hooks/useFieldHandler';
import { FieldHandlerReturn } from '../types/FieldHandler';
import { SelectComponent, SelectFieldTypes } from '../types/Select';

const Select: SelectComponent = ({
  domRef,
  fieldRef,
  name,
  options,
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

  const { optionsMap, optionsArray } = useMemo(() => {
    if (!options) return {};
    const newOptionsMap = new Map();
    const newOptionsArray: Array<[SelectFieldTypes, string]> = [];
    for (const { value, label } of options) newOptionsMap.set(value, label);
    for (const option of newOptionsMap.entries()) newOptionsArray.push(option);
    return { optionsMap: newOptionsMap, optionsArray: newOptionsArray };
  }, [options]);

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = async (event) => {
    if (!optionsMap) return;
    for (const [value] of optionsMap.entries()) {
      const areBothThePlaceholder = value === undefined && event.target.value === '';
      if (areBothThePlaceholder || String(value) === event.target.value) {
        await setValue(value);
        onChange?.(event);
        break;
      }
    }
  };

  const onBlurHandler: FocusEventHandler<HTMLSelectElement> = (event) => {
    blur();
    onBlur?.(event);
  };

  if (settings?.customSelect) {
    return createElement(settings.customSelect, {
      domRef,
      fieldContext: fieldHandler as FieldHandlerReturn,
      options,
      ...rest,
    });
  }

  return (
    <select
      ref={domRef}
      name={name}
      value={value}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      aria-invalid={!isValid}
      {...rest}
    >
      {optionsArray?.map(([value = '', label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select;
