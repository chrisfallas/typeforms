import { FormContextValues } from '../types/FormProvider';
declare const useFormContext: <T extends Record<string, any> = Record<string, any>>() => FormContextValues<T>;
export default useFormContext;
