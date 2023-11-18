import { FormSchemaValidatorFunction, FormSchemaValidatorObject } from './Form';
export interface UseFormHandlerProps<T extends Record<string, any> = Record<string, any>> {
    initialValues?: Partial<T>;
    schemaValidation?: FormSchemaValidatorFunction<T> | FormSchemaValidatorObject<T>;
}
export interface UseFormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
    state: Partial<T>;
    getValue: <K extends Extract<keyof T, string>>(name: K) => T[K] | undefined;
}
