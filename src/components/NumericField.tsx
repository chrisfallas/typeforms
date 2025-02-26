import { ChangeEvent, FocusEvent, useMemo } from 'react';
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

  const checked = useMemo(() => {
    if (rest.type !== 'radio') return undefined;
    return value === rest.value;
  }, [value, rest.value]);

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(+target.value);
  };

  const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    blur();
    onBlur?.(event);
  };

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
