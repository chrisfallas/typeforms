import { UseFormElementReturn } from '../types/UseFormElement';
declare const useFormElement: <T extends Record<string, any> = Record<string, any>>(name: Extract<keyof T, string>) => UseFormElementReturn<T>;
export default useFormElement;
