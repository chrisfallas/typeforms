import Form from '../components/Form';
import Input from '../components/Input';
import TypeFormReturn from '../types/TypeForm';

export const TypeForm = <T extends Record<string, any>>(): TypeFormReturn<T> => ({
  Form: Form as TypeFormReturn<T>['Form'],
  Input: Input as TypeFormReturn<T>['Input'],
  applyInputTypes: ((component) => component) as TypeFormReturn<T>['applyInputTypes'],
});
