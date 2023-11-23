import { UseFormHandlerProps, UseFormHandlerReturn } from '../types/UseFormHandler';
/**
 * Internal hook to handle form state.
 * This is not being exported to keep the library API simple and clean.
 */
declare const useFormHandler: <T extends Record<string, any> = Record<string, any>>({ initialValues, validateOnSubmit, validateOnChange, validateOnBlur, schemaValidation, onChange: onChangeCallback, onSubmit: onSubmitCallback, }: UseFormHandlerProps<T>) => UseFormHandlerReturn<T>;
export default useFormHandler;
