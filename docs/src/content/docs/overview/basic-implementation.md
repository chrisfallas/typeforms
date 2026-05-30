---
title: Basic Implementation
sidebar:
  order: 1
---

# Basic Implementation

As mentioned in the [Introduction](/), TypeForms API consists mainly of components and (internally) context providers, this ensures that you don't have to
worry about manually wiring up attributes and handlers on your own.

## Form container

Same as the native HTML `form` tag, the `Form` component is the root container of your form structure, internally is a context provider that encapsulates all the form logic
and provides the necessary data and handlers to its fields. It accepts a few props with which you can control the form behavior.

## Form elements

When working with HTML native forms, the `input` tag can be used for fields of different types like strings, numbers or boolean by changing the `type` prop, but even if you input is `type=number`,
it will still produce a string value within the form data. TypeForms provides a set of components that abstract the native `input` tag, and handle the type conversion for you. These components are the
**TextField** for string fields, the **NumericField** for number fields, and the **Checkbox** for boolean fields.

But not everything is an `input` of course, therefore TypeForms also provides a **TextArea**, a **Select**, and a **Field** which is a high-order component to create custom fields.

**Note**: All of them narrow down their `name` prop to only those fields of the type they are designed to handle.

## Basic Implementation

A basic implementation would look like this:

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

**Note**: TypeFroms is an "unstyled" library, and styles are not part of the example above, but all the components render the respective HTML native tag
and you can treat them as such, meaning that you are able to pass them the same props you would pass to the native tags, including `className` and `style` to add styles.
