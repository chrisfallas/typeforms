# TypeForms

Build type-safe React forms, keeping your code clean.

## Basic Implementation

```tsx
import TypeForm, { FormProps, SelectProps } from 'typeforms';

interface MyForm {
  name: string;
  age: number;
  seniority: 'junior' | 'mid' | 'senior' | 'lead';
  agreeTermsOfService: boolean;
}

const { Form, TextField, NumericField, Select, Checkbox } = TypeForm<MyForm>();

const MyForm = () => {
  const onSubmitHandler: FormProps<MyForm>['onSubmit'] = (values) => {
    if (!values.ok) console.error('Form has errors:', values.errors);
    else console.log('Form submitted:', values.data);
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <TextField name="name" />
      <NumericField name="age" />
      <Select name="seniority" options={seniorityOptions} />
      <Checkbox name="agreeTermsOfService" />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
};

const seniorityOptions: SelectProps<MyForm, 'seniority'>['options'] = [
  { value: 'junior', label: 'Junior / Entry Level' },
  { value: 'mid', label: 'Mid Developer' },
  { value: 'senior', label: 'Senior Developer' },
  { value: 'lead', label: 'Tech Lead' },
];
```

# Validations

```jsx
import TypeForm, { FormProps } from 'typeforms';

interface MyForm {
  name: string;
  email: string;
  password: string;
}

const { Form, TextField, Error } = TypeForm<MyForm>();

const MyForm = () => {
  const onSubmitHandler: FormProps<MyForm>['onSubmit'] = (values) => {
    if (!values.ok) console.error('Form has errors:', values.errors);
    else console.log('Form submitted:', values.data);
  };

  return (
    <Form validations={validations} onSubmit={onSubmitHandler}>
      <TextField name="name" />
      <Error htmlFor="name" />
      <TextField name="email" validateOnChange={false} />
      <Error htmlFor="email" />
      <TextField name="password" />
      <Error htmlFor="password" />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
};

const validations: FormProps<MyForm>['validations'] = {
  name: (value) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name is too short';
    return true;
  },
  email: async (value) => {
    const response = await fetch(`/api/validate-email?email=${value}`);
    if (!response.ok) return 'Email is invalid';
    return true;
  },
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password is too short';
    return true;
  },
};
```
