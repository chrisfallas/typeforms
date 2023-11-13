import useFormContext from '../hooks/useFormContext';
import TypeFormInputProps from '../types/TypeFormInput';

export type InputProps<
  T extends Record<string, any> = Record<string, any>,
  K extends keyof T = any,
> = TypeFormInputProps<K, T[K]>;

const Input = <
  T extends Record<string, any> = Record<string, any>,
  K extends keyof T = any,
>(
  props: InputProps<T, K>,
) => {
  const { name, onChange, ...rest } = props;
  const { getValue } = useFormContext<T>();

  const value = getValue(name);

  onChange(value);

  return <input name={name as string} value={value} {...rest} />;
};

export default Input;
