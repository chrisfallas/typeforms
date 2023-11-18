import { UseFormHandlerReturn } from './UseFormHandler';

export interface UseFormElementReturn<
  T extends Record<string, any> = Record<string, any>,
> {
  id: string;
  value: ReturnType<UseFormHandlerReturn<T>['getValue']>;
}
