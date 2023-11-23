import { ChangeEventHandler, FocusEventHandler } from 'react';
import useFormElement from '../hooks/useFormElement';
import { KeyOf, RenderProp } from '../types/Global';
import { HTMLInputProps, InputProps } from '../types/Input';

const Input = <
  T extends Record<string, any> = Record<string, any>,
  K extends KeyOf<T> = KeyOf<T>,
>(
  props: InputProps<T, K> & RenderProp<HTMLInputProps>,
) => {
  const {
    id,
    name,
    value: valueProp,
    onChange: onChangeCallback,
    onBlur: onBlurCallback,
    label,
    labelId,
    labelClassName,
    labelRef,
    labelWrap,
    labelPlacement,
    render,
    ...htmlInputProps
  } = props;

  const { value, ...formElement } = useFormElement<T>(name);

  const formElementId = id || formElement.id;

  const onChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    formElement.onChange(event);
    new Promise(() => onChangeCallback?.(event.target.value as T[K]));
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = async (event) => {
    formElement.onBlur(event);
    new Promise(() => onBlurCallback?.(event));
  };

  const inputComponentProps: HTMLInputProps = {
    ...htmlInputProps,
    id: formElementId,
    name,
    value: name ? String(value ?? '') : valueProp,
    onChange,
    onBlur,
  };

  if (render) return render(inputComponentProps);

  const inputComponent = <input {...inputComponentProps} />;

  if (!label) return inputComponent;

  if (labelWrap === 'wrap') {
    return (
      <label id={labelId} className={labelClassName} ref={labelRef}>
        <span>{label}</span>
        {inputComponent}
      </label>
    );
  }

  const labelComponent = (
    <label id={labelId} className={labelClassName} ref={labelRef} htmlFor={formElementId}>
      <span>{label}</span>
    </label>
  );

  if (labelPlacement === 'bottom') {
    return (
      <>
        {inputComponent}
        {labelComponent}
      </>
    );
  }

  return (
    <>
      {labelComponent}
      {inputComponent}
    </>
  );
};

export default Input;
