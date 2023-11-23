import { UseSchemaValidationProps, UseSchemaValidationReturn } from '../types/UseSchemaValidation';
/**
 * Internal hook to handle form schema validations.
 * This is not being exported to keep the library API simple and clean.
 */
declare const useSchemaValidation: <T extends Record<string, any> = Record<string, any>>({ schemaValidation, }: UseSchemaValidationProps<T>) => UseSchemaValidationReturn<T>;
export default useSchemaValidation;
