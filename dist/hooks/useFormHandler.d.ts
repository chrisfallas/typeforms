export interface UseFormHandlerProps<T extends Record<string, any> = Record<string, any>> {
    initialValues?: Partial<T>;
}
export interface UseFormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
    state: Partial<T>;
    getValue: <K extends keyof T>(name: K) => T[K] | undefined;
}
/**
 * Internal hook to handle form state.
 * This is not being exported to keep the library API simple and clean.
 */
declare const useFormHandler: <T extends Record<string, any> = Record<string, any>>({ initialValues, }: UseFormHandlerProps<T>) => UseFormHandlerReturn<T>;
export default useFormHandler;
