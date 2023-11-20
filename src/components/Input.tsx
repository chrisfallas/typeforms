import { ChangeEventHandler, InputHTMLAttributes } from 'react';
import useFormElement from '../hooks/useFormElement';
import { RenderProp } from '../types/Global';
import { InputProps } from '../types/Input';

const Input = <
  T extends Record<string, any> = Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
>(
  props: InputProps<T, K> & RenderProp<InputHTMLAttributes<HTMLInputElement>>,
) => {
  const {
    id,
    name,
    onChange: onChangeCallback,
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

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    formElement.onChange(event);
    onChangeCallback?.(event.target.value as T[K]);
  };

  if (props.children) return props.children;

  const inputComponentProps = {
    ...htmlInputProps,
    id: formElementId,
    name,
    value: String(value ?? ''),
    onChange,
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

  if (labelPlacement === 'top') {
    return (
      <>
        {labelComponent}
        {inputComponent}
      </>
    );
  }

  return (
    <>
      {inputComponent}
      {labelComponent}
    </>
  );
};

export default Input;
