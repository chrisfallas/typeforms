---
title: Validations
---

# Validations

TypeForms is agnostic to the schema validation library you use, it does not provide a built-in API for defining validation rules.
Instead, it accepts a callback function, allowing you to handle the specific validation logic. The library is responsible
for managing **when** validations occurs, while you are responsible for **how** they are performed.

## Validation callbacks

Validation callbacks should return either a boolean, a string or a list of strings. This is how TypeForms will interpret each possible return value:
- **A true**: The field is consider valid.
- **A false**: The field is consider invalid, but no error message will be displayed anywhere.
- **A string or a list of strings**: The field is consider invalid, and the error message will be displayed. (More on how to display errors down below)

There are two ways to define your form validations, you can send all the field validations as a single object to the `Form` component,
or you can send them individually to each `Field` component. If you send both, they both will be used.

```ts
import TypeForm, { FormProps } from 'typeforms';

interface MyForm {
  name: string;
  email: string;
  password: string;
}

const { Form, TextField } = TypeForm<MyForm>();

const validations: FormProps<MyForm>['validations'] = {
  name: (value) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name is too short';
    return true;
  },
  password: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password is too short';
    return true;
  },
};

const emailValidation = (value?: string) => { // if you put `number` here, the email `TextField` will not accept the validation callback because of mismatching types
  if (!value) return 'Email is required';
  if (!value.includes('@')) return 'Email is invalid';
  return true;
};

const MyForm = () => {
  return (
    <Form validations={validations} onSubmit={...}>
      <TextField name="name" />
      <TextField name="email" validation={emailValidation} />
      <TextField name="password" />
      ...
    </Form>
  );
};
```

## Async validations

Following the example above, let's imagine you need to asynchronously validate the email field against an API. To do this, your validation callback
simply needs to return a promise that resolves to one of the same values that a synchronous validation would.

```ts
import TypeForm, { FormProps } from 'typeforms';

interface MyForm {
  name: string;
  email: string;
  password: string;
}

const { Form, TextField } = TypeForm<MyForm>();

const validations: FormProps<MyForm>['validations'] = {
  ...
};

const emailValidation = async (value?: string) => { // Yup, that's all.
  if (!value) return 'Email is required';
  const response = await fetch(`/api/validate-email?email=${value}`);
  if (!response.ok) return 'Email is invalid';
  return true;
};

const MyForm = () => {
  return (
    <Form validations={validations} onSubmit={...}>
      <TextField name="name" />
      <TextField name="email" validation={emailValidation} />
      <TextField name="password" />
      ...
    </Form>
  );
};
```

As being asynchronous, the email validation will be isolated to prevent it from blocking other field validations. This means that you might see some
other field errors showing up before the email validation is completed, but once it's done, the error will be displayed if the email is invalid. Obviously, this
doesn't apply to the `onSubmit` validations, which will wait for all (sync and async) validations to be completed before submitting the form.

## Validation triggers

There are four different events that trigger the field validations:
- **On Mount**: The fields will be validated when the form is mounted.
- **On Change**: The fields will be validated every time their value changes.
- **On Blur**: The fields will be validated when they lose focus.
- **On Submit**: The fields will be validated when the form is submitted.

By default, they are all enabled except on mount, but the `Form` and all field components accept certain props to change this behavior.

In the case of the example we have been following in this section, it will be overkilling to validate the email field every time the user types a single character.
Let's change that:

```ts
import TypeForm, { FormProps } from 'typeforms';

interface MyForm {
  name: string;
  email: string;
  password: string;
}

const { Form, TextField } = TypeForm<MyForm>();

const validations: FormProps<MyForm>['validations'] = {
  ...
};

const emailValidation = async (value?: string) => {
  ...
};

const MyForm = () => {
  return (
    <Form validations={validations} onSubmit={...}>
      <TextField name="name" />
      <TextField name="email" validation={emailValidation} validateOnChange={false} />
      <TextField name="password" />
      ...
    </Form>
  );
};
```

Now, all the fields will be validated on change, on blur, and on submit, except for the email field, which is skipping the on change validation.

## Validation errors

As part of the components API, you will find one called `Error`, which will display the error message for you if the field is invalid. This component will
render a `span` tag which by default will be hidden if there's no error message to display, you can customize what is rendered using the `render` prop.

```ts
const MyForm = () => {
  return (
    <Form validations={...} onSubmit={...}>
      <TextField name="name" />
      <Error htmlFor="name" />
      <TextField name="email" />
      <Error htmlFor="email" />
      <TextField name="password" />
      <Error htmlFor="password" />
      ...
    </Form>
  );
};
```

Since form fields commonly only display one error at the time, the `Error` component is meant to render only one error message. There are two ways to display
multiple errors per field: mounting multiple `Error` instances and specify what error message each of them should display using the `index` prop,
or mounting one single `Error` instance and use the `render` prop which will provide you the entire list of error messages.

```ts
const MyForm = () => {
  return (
    <Form validations={...} onSubmit={...}>
      <TextField name="name" />
      <Error htmlFor="name" index={0} />
      <Error htmlFor="name" index={1} />
      ...
    </Form>
  );
};
```

In the example above, the field `name` could have multiple errors, but it's limited to display only up to two error messages.
