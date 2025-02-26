import { ChangeEventHandler, FocusEventHandler, useMemo } from 'react';
import useFieldHandler from '../hooks/useFieldHandler';
import { KeyOf } from '../types/Global';
import { SelectComponent, SelectFieldTypes, SelectProps } from '../types/Select';

const Select: SelectComponent = <
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf = KeyOf,
  V extends SelectFieldTypes = SelectFieldTypes,
>({
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
}: SelectProps<T, K, V>) => {
  const { value, isValid, setValue, blur } = useFieldHandler<K, V>({
    fieldRef,
    name,
    onChange,
    validation,
    validateOnMount,
    validateOnSubmit,
    validateOnChange,
    validateOnBlur,
  });

  const { optionsMap, optionsArray } = useMemo(() => {
    if (!options) return {};
    const newOptionsMap = new Map<V | undefined, string>();
    const newOptionsArray: Array<[V | undefined, string]> = [];
    for (const { value, label } of options) newOptionsMap.set(value, label);
    for (const option of newOptionsMap.entries()) newOptionsArray.push(option);
    return { optionsMap: newOptionsMap, optionsArray: newOptionsArray };
  }, [options]);

  const onChangeHandler: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    if (!optionsMap) return;
    for (const [value] of optionsMap.entries()) {
      const areBothThePlaceholderOption = value === undefined && target.value === '';
      if (areBothThePlaceholderOption || String(value) === target.value) {
        setValue(value);
        break;
      }
    }
  };

  const onBlurHandler: FocusEventHandler<HTMLSelectElement> = (event) => {
    blur();
    onBlur?.(event);
  };

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
