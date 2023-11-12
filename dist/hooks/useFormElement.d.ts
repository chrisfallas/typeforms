import { UseFormHandlerReturn } from './useFormHandler';
export interface UseFormElementReturn<T extends Record<string, any> = Record<string, any>> {
    value: ReturnType<UseFormHandlerReturn<T>['getValue']>;
}
declare const useFormElement: <T extends Record<string, any> = Record<string, any>>(name: keyof T) => UseFormElementReturn<T>;
export default useFormElement;
