import { UseFormHandlerReturn } from './UseFormHandler';
export interface UseFormElementReturn<T extends Record<string, any> = Record<string, any>> {
    id: string;
    value: ReturnType<UseFormHandlerReturn<T>['getValue']>;
    setValue: <K extends Extract<keyof T, string>>(value: T[K]) => Promise<void>;
    onChange: UseFormHandlerReturn<T>['onChange'];
}
