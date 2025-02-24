import { useRef, RefObject } from 'react';
import { FormContext } from '../contexts/FormContext';

export type FormRefHook<T extends Record<string, any> = Record<string, any>> =
  () => RefObject<FormContext<T>>;

const useFormRef: FormRefHook = <T extends Record<string, any> = Record<string, any>>() =>
  useRef<FormContext<T>>(null);

export default useFormRef;
