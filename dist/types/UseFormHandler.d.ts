import { ChangeEvent, FocusEvent, FormEvent } from 'react';
import { SchemaValidationResult, UseSchemaValidationProps, UseSchemaValidationReturn } from './UseSchemaValidation';
import { FormElement } from './Element';
import { KeyOf } from './Global';
import { SchemaValidationStrategy } from './UseSchemaValidation';
export interface UseFormHandlerProps<T extends Record<string, any> = Record<string, any>> {
    initialValues?: Partial<T>;
    validateOnSubmit?: boolean | SchemaValidationStrategy<T>;
    validateOnChange?: boolean | SchemaValidationStrategy<T>;
    validateOnBlur?: boolean | SchemaValidationStrategy<T>;
    schemaValidation?: UseSchemaValidationProps<T>['schemaValidation'];
    onChange?: (data: Partial<T>) => Promise<void> | void;
    onSubmit?: (result: OnSubmitResultSuccess | OnSubmitResultError) => Promise<void> | void;
}
export interface UseFormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
    data: Partial<T>;
    isValid: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
    errors: UseSchemaValidationReturn<T>['errors'];
    getValue: <K extends KeyOf<T>>(name?: K) => T[K] | undefined;
    setValue: <K extends KeyOf<T>>(name: K, value: T[K]) => Promise<void>;
    setValues: <K extends KeyOf<T>>(values: Array<{
        name: K;
        value: T[K];
        validate?: boolean;
    }>) => Promise<void>;
    getErrors: UseSchemaValidationReturn<T>['getErrors'];
    onChange: (event: ChangeEvent<FormElement>) => Promise<void>;
    onBlur: (event: FocusEvent<FormElement>) => Promise<void>;
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    validate: UseSchemaValidationReturn<T>['validate'];
    reset: () => Promise<void>;
}
type OnSubmitResultSuccess<T extends Record<string, any> = Record<string, any>> = {
    ok: true;
    data: T;
};
type OnSubmitResultError<T extends Record<string, any> = Record<string, any>> = {
    ok: false;
    errors: SchemaValidationResult<T>;
};
export {};
