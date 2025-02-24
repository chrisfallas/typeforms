import { createContext, useContext, PropsWithChildren } from 'react';
import {
  ValidationsContextValues,
  ValidationsProviderProps,
} from '../types/ValidationsProvider';
import useValidationsHandler from '../hooks/useValidationsHandler';

export const ValidationsContext = createContext<ValidationsContextValues>(
  {} as ValidationsContextValues,
);

const ValidationsProvider = <T extends Record<string, any> = Record<string, any>>({
  render,
  children,
  ...rest
}: PropsWithChildren<ValidationsProviderProps<T>>) => {
  const contextValues: ValidationsContextValues<T> = useValidationsHandler<T>(rest);
  return (
    <ValidationsContext.Provider value={contextValues}>
      {render ? render(contextValues) : children}
    </ValidationsContext.Provider>
  );
};

export const useValidationsContext = <
  T extends Record<string, any> = Record<string, any>,
>() => {
  const context = useContext(ValidationsContext);

  if (!context)
    throw new Error('useValidationsContext must be used from a Form child component');

  return context as ValidationsContextValues<T>;
};

export default ValidationsProvider;
