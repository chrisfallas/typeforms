import { FormSchemaValidatorFunction, FormSchemaValidatorObject } from '../types/Form';
export interface UseFormHandlerProps<T extends Record<string, any> = Record<string, any>> {
    initialValues?: Partial<T>;
    schemaValidation?: FormSchemaValidatorFunction<T> | FormSchemaValidatorObject<T>;
}
export interface UseFormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
    state: Partial<T>;
    getValue: <K extends keyof T>(name: K) => T[K] | undefined;
}
