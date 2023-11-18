import { InputHTMLAttributes } from 'react';
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
    onChange,
    label,
    labelId,
    labelClassName,
    labelRef,
    labelWrap,
    labelPlacement,
    ...htmlInputProps
  } = props;

  const { value, ...formElement } = useFormElement<T>(name);

  const formElementId = id || formElement.id;

  if (props.children) return props.children;

  const inputComponentProps = {
    ...htmlInputProps,
    id: formElementId,
    name,
    value: value ? +value : '',
  };

  if (props.render) return props.render(inputComponentProps);

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
