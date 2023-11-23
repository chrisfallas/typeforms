import { ChangeEvent, FocusEvent, FormEvent } from 'react';
import { FormSchemaValidationResult, FormSchemaValidationFunction, FormSchemaValidationObject, FormSchemaValidationError } from './Form';
import { FormElement } from './Element';
import { KeyOf } from './Global';
export interface UseFormHandlerProps<T extends Record<string, any> = Record<string, any>> {
    initialValues?: Partial<T>;
    validateOnSubmit?: boolean | SchemaValidationStrategy<T>;
    validateOnChange?: boolean | SchemaValidationStrategy<T>;
    validateOnBlur?: boolean | SchemaValidationStrategy<T>;
    schemaValidation?: FormSchemaValidationFunction<T> | FormSchemaValidationObject<T>;
    onChange?: (data: Partial<T>) => Promise<void> | void;
    onSubmit?: (result: OnSubmitResultSuccess | OnSubmitResultError) => Promise<void> | void;
}
export interface UseFormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
    data: Partial<T>;
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    errors: Partial<Record<KeyOf<T>, FormSchemaValidationError>>;
    getValue: <K extends KeyOf<T>>(name?: K) => T[K] | undefined;
    setValue: <K extends KeyOf<T>>(name: K, value: T[K]) => Promise<void>;
    setValues: <K extends KeyOf<T>>(values: Array<{
        name: K;
        value: T[K];
        validate?: boolean;
    }>) => Promise<void>;
    getErrors: <K extends KeyOf<T>>(name?: K) => FormSchemaValidationError | undefined;
    onChange: (event: ChangeEvent<FormElement>) => Promise<void>;
    onBlur: (event: FocusEvent<FormElement>) => Promise<void>;
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    validate: (options?: {
        updateFormState?: boolean;
        include?: SchemaValidationStrategy<T>['include'];
        exclude?: SchemaValidationStrategy<T>['exclude'];
    }) => Promise<Partial<Record<KeyOf<T>, FormSchemaValidationError>>>;
    reset: () => Promise<void>;
}
export type SchemaValidationStrategy<T extends Record<string, any> = Record<string, any>> = {
    include?: Array<keyof T>;
    exclude?: Array<keyof T>;
};
type OnSubmitResultSuccess<T extends Record<string, any> = Record<string, any>> = {
    ok: true;
    data: T;
};
type OnSubmitResultError<T extends Record<string, any> = Record<string, any>> = {
    ok: false;
    errors: FormSchemaValidationResult<T>;
};
export {};
