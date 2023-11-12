import { FormContext, FormContextValues } from '../providers/FormProvider';
import { useContext } from 'react';

const useFormContext = <T extends Record<string, any> = Record<string, any>>() =>
  useContext(FormContext) as FormContextValues<T>;

export default useFormContext;
