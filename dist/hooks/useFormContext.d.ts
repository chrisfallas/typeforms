import { FormContextValues } from 'providers/FormProvider';
declare const useFormContext: <T extends Record<string, any> = Record<string, any>>() => FormContextValues<T>;
export default useFormContext;
