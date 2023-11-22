import { KeyOf } from './Global';
import { UseFormHandlerReturn } from './UseFormHandler';
export interface UseFormElementReturn<T extends Record<string, any> = Record<string, any>> {
    id: string;
    value?: ReturnType<UseFormHandlerReturn<T>['getValue']>;
    setValue: <K extends KeyOf<T>>(value: T[K]) => Promise<void>;
    onChange: UseFormHandlerReturn<T>['onChange'];
    onBlur: UseFormHandlerReturn<T>['onBlur'];
}
