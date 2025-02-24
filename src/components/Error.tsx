import { useFieldErrors } from '../hooks/useValidationErrors';
import { ErrorComponent } from '../types/Error';

const Error: ErrorComponent = ({ domRef, htmlFor, index, alwaysVisible, ...rest }) => {
  const { isValid, errors } = useFieldErrors(htmlFor);

  const error = errors[index ?? 0];

  if (!error && !alwaysVisible) return null;

  return (
    <span
      ref={domRef}
      role="alert"
      style={{ visibility: isValid ? 'hidden' : 'visible' }}
      {...rest}
    >
      {error || <>&nbsp;</>}
    </span>
  );
};

export default Error;
