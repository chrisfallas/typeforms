import { ChangeEvent, FocusEvent, FormEvent } from 'react';
import { FormSchemaValidatorFunction, FormSchemaValidatorObject } from './Form';
import { FormElement } from './Element';
import { KeyOf } from './Global';
export interface UseFormHandlerProps<T extends Record<string, any> = Record<string, any>> {
    initialValues?: Partial<T>;
    schemaValidation?: FormSchemaValidatorFunction<T> | FormSchemaValidatorObject<T>;
    onChange?: (data: Partial<T>) => Promise<void> | void;
    onSubmit?: (result: {
        ok: boolean;
        data: T;
    }) => Promise<void> | void;
}
export interface UseFormHandlerReturn<T extends Record<string, any> = Record<string, any>> {
    data: Partial<T>;
    isDirty: boolean;
    getValue: <K extends KeyOf<T>>(name?: K) => T[K] | undefined;
    setValue: <K extends KeyOf<T>>(name: K, value: T[K]) => Promise<void>;
    setValues: <K extends KeyOf<T>>(values: Array<{
        name: K;
        value: T[K];
        validate?: boolean;
    }>) => Promise<void>;
    onChange: (event: ChangeEvent<FormElement>) => Promise<void>;
    onBlur: (event: FocusEvent<FormElement>) => Promise<void>;
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
    reset: () => Promise<void>;
}
