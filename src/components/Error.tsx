import { useFieldErrors } from '../hooks/useFieldErrors';
import { ErrorComponent } from '../types/Error';

const Error: ErrorComponent = ({
  domRef,
  htmlFor,
  index = 0,
  alwaysVisible,
  render,
  ...rest
}) => {
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
