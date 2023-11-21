import { UseFormElementReturn } from '../types/UseFormElement';
import { KeyOf } from '../types/Global';
declare const useFormElement: <T extends Record<string, any> = Record<string, any>>(name: KeyOf<T>) => UseFormElementReturn<T>;
export default useFormElement;
