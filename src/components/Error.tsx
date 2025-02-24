import { useFieldErrors } from '../hooks/useValidationErrors';
import { ErrorComponent, ErrorProps } from '../types/Error';
import { KeyOf } from '../types/Global';

const Error: ErrorComponent = <K extends KeyOf = KeyOf>({
  domRef,
  htmlFor,
  index = 0,
  alwaysVisible,
  render,
  ...rest
}: ErrorProps<K>) => {
  const fieldErrors = useFieldErrors(htmlFor);

  const { isValid, errors } = fieldErrors;

  const error = errors[index];

  if (!error && !alwaysVisible) return null;

  return (
    <span
      ref={domRef}
      role="alert"
      style={{ visibility: isValid ? 'hidden' : 'visible' }}
      {...rest}
    >
      {render ? render(fieldErrors) : error || <>&nbsp;</>}
    </span>
  );
};

export default Error;
