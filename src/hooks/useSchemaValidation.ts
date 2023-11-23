import { useEffect, useState } from 'react';
import { SchemaValidationStrategy } from '../types/UseSchemaValidation';
import {
  UseSchemaValidationProps,
  UseSchemaValidationReturn,
} from '../types/UseSchemaValidation';
import {
  SchemaValidationFunction,
  SchemaValidationObject,
} from '../types/UseSchemaValidation';
import { KeyOf } from '../types/Global';

/**
 * Internal hook to handle form schema validations.
 * This is not being exported to keep the library API simple and clean.
 */
const useSchemaValidation = <T extends Record<string, any> = Record<string, any>>({
  schemaValidation,
}: UseSchemaValidationProps<T>): UseSchemaValidationReturn<T> => {
  const [errors, setErrors] = useState<UseSchemaValidationReturn<T>['errors']>({});

  const getErrors: UseSchemaValidationReturn<T>['getErrors'] = (name) =>
    name ? errors[name] : undefined;

  const validateWithFunction = async (
    data: Partial<T>,
    schemaValidationFunction: SchemaValidationFunction<T>,
    schemaValidationStrategy: SchemaValidationStrategy<T>,
  ): Promise<typeof errors> => {
    const { include, exclude } = schemaValidationStrategy;
    const errorsFound: typeof errors = {};
    const result = await schemaValidationFunction(data);
    for (const field in result) {
      let needsValidation = true;
      if (include && !include.includes(field as KeyOf<T>)) needsValidation = false;
      if (exclude && exclude.includes(field as KeyOf<T>)) needsValidation = false;
      if (!needsValidation) continue;
      errorsFound[field as KeyOf<T>] = result[field];
    }
    return errorsFound;
  };

  const validateWithObject = async (
    data: Partial<T>,
    schemaValidationObject: SchemaValidationObject<T>,
    schemaValidationStrategy: SchemaValidationStrategy<T>,
  ): Promise<typeof errors> => {
    const { include, exclude } = schemaValidationStrategy;
    const errorsFound: typeof errors = {};
    for (const field in schemaValidationObject) {
      let needsValidation = true;
      if (include && !include.includes(field as KeyOf<T>)) needsValidation = false;
      if (exclude && exclude.includes(field as KeyOf<T>)) needsValidation = false;
      if (!needsValidation) continue;
      const validationFunction = schemaValidationObject[field];
      const value = data[field] as T[KeyOf<T>] | undefined;
      const result = await validationFunction?.(value);
      errorsFound[field as KeyOf<T>] = result;
    }
    return errorsFound;
  };

  const validate: UseSchemaValidationReturn<T>['validate'] = async (options = {}) => {
    const { data, updateState = true } = options;
    if (!schemaValidation || !data) return {};
    let errorsFound: typeof errors;
    if (typeof schemaValidation === 'function') {
      errorsFound = await validateWithFunction(data, schemaValidation, options);
    } else {
      errorsFound = await validateWithObject(data, schemaValidation, options);
    }
    if (updateState) {
      const oldStateStringified = JSON.stringify(errors);
      const newStateStringified = JSON.stringify({ ...errors, ...errorsFound });
      if (oldStateStringified !== newStateStringified) {
        setErrors((prev) => ({ ...prev, ...errorsFound }));
      }
    }
    const errorsWithoutUndefines: typeof errors = {};
    for (const field in errorsFound) {
      const error = errorsFound[field];
      if (error?.length) errorsWithoutUndefines[field as KeyOf<T>] = error;
    }
    return errorsWithoutUndefines;
  };

  const checkValidationStrategy: UseSchemaValidationReturn<T>['checkValidationStrategy'] =
    (strategy) => {
      let isValidationRequired = false;
      let include: SchemaValidationStrategy<T>['include'] | undefined;
      let exclude: SchemaValidationStrategy<T>['exclude'] | undefined;
      if (typeof strategy === 'boolean') isValidationRequired = strategy;
      else if (Array.isArray(strategy.include)) {
        isValidationRequired = true;
        include = strategy.include;
      } else if (Array.isArray(strategy.exclude)) {
        isValidationRequired = true;
        exclude = strategy.exclude;
      }
      return { isValidationRequired, include, exclude };
    };

  const resetErrors = async () => setErrors({});

  return {
    errors,
    getErrors,
    validate,
    checkValidationStrategy,
    resetErrors,
  };
};

export default useSchemaValidation;
