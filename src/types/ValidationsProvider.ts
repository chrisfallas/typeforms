import { RenderProp } from './Global';
import { ValidationsHandlerProps, ValidationsHandlerReturn } from './ValidationsHandler';

export interface ValidationsProviderProps<
  T extends Record<string, any> = Record<string, any>,
> extends ValidationsHandlerProps<T> {
  render?: RenderProp<ValidationsContextValues<T>>;
}

export interface ValidationsContextValues<
  T extends Record<string, any> = Record<string, any>,
> extends ValidationsHandlerReturn<T> {}
