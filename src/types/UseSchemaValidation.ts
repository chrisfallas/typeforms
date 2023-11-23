import { KeyOf } from './Global';

export interface UseSchemaValidationProps<
  T extends Record<string, any> = Record<string, any>,
> {
  schemaValidation?: SchemaValidationFunction<T> | SchemaValidationObject<T>;
}

export interface UseSchemaValidationReturn<
  T extends Record<string, any> = Record<string, any>,
> {
  errors: SchemaValidationResult<T>;
  getErrors: <K extends KeyOf<T>>(name?: K) => SchemaValidationError | undefined;
  validate: (options?: {
    data?: Partial<T>;
    updateState?: boolean;
    include?: SchemaValidationStrategy<T>['include'];
    exclude?: SchemaValidationStrategy<T>['exclude'];
  }) => Promise<Partial<Record<KeyOf<T>, SchemaValidationError>>>;
  checkValidationStrategy: (strategy: boolean | SchemaValidationStrategy<T>) => {
    isValidationRequired: boolean;
    include?: SchemaValidationStrategy<T>['include'];
    exclude?: SchemaValidationStrategy<T>['exclude'];
  };
  resetErrors: () => Promise<void>;
}

export type SchemaValidationStrategy<
  T extends Record<string, any> = Record<string, any>,
> = {
  include?: Array<KeyOf<T>>;
  exclude?: Array<KeyOf<T>>;
};

export type SchemaValidationFunction<T extends object> = (
  values: Partial<T>,
) => Promise<SchemaValidationResult<T>> | SchemaValidationResult<T>;

export type SchemaValidationObject<T extends object> = Partial<{
  [K in KeyOf<T>]: (
    value: T[K] | undefined,
  ) => Promise<SchemaValidationError> | SchemaValidationError;
}>;

export type SchemaValidationResult<T extends Record<string, any> = Record<string, any>> =
  Partial<{
    [K in KeyOf<T>]: SchemaValidationError;
  }>;

export type SchemaValidationError = string | Array<string> | undefined;
