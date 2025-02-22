import { ChangeEvent } from 'react';
import { InputComponent } from '../types/Input';
import { FieldContextValues } from '../types/FieldProvider';
import useFieldHandler from '../hooks/useFieldHandler';

const Input: InputComponent = (props) => {
  const { domRef, fieldRef, name, onChange, ...rest } = props;

  const { value = '', setValue }: FieldContextValues = useFieldHandler({
    fieldRef,
    name,
    onChange,
  });

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.type === 'number' ? +target.value : target.value;
    setValue(value);
  };

  return (
    <input ref={domRef} name={name} value={value} onChange={onChangeHandler} {...rest} />
  );
};

export default Input;
