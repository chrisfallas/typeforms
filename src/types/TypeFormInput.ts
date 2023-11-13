import { RecordKey } from './Global';

type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputCustomProps<K extends RecordKey = string, V = any> = {
  name: K;
  onChange: (value: V | undefined) => void;
};

type InputInheritedProps = Omit<HTMLInputProps, keyof InputCustomProps>;

type TypeFormInputProps<K extends RecordKey = string, V = any> = InputCustomProps<K, V> &
  InputInheritedProps;

export default TypeFormInputProps;
