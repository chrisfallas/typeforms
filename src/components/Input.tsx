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
    name,
    value: valueProp,
    onChange: onChangeCallback,
    onBlur: onBlurCallback,
    render,
    ...htmlInputProps
  } = props;

  const { value, ...formElement } = useFormElement<T>(name);

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
    name,
    value: name ? String(value ?? '') : valueProp,
    onChange,
    onBlur,
  };

  if (render) return render(inputComponentProps);

  return <input {...inputComponentProps} />;
};

export default Input;
