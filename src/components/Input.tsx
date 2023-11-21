import { ChangeEventHandler } from 'react';
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

  const inputComponentProps: HTMLInputProps = {
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
