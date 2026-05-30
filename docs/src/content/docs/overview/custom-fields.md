---
title: Custom Fields
sidebar:
  order: 3
---

# Custom Fields

If none of the basic field components provided by TypeForms meet your requirements, you can create your own. This is useful when
you need to integrate a third-party components library or when some of your fields have more complex data types like arrays or objects.

## The generic Field component

The `Field` component encapsulates the logic that connects your custom components with the form context, you can pass your custom component through the prop `component`.

To enforce type safety, the type of your custom component props should extend our interface `FieldContext` since that's what the `Field` component
will be injecting into your custom component when rendering it. This interface is generic and you must define the type of fields that your custom component can handle.
This is not optional, if you don't do any of this the `Field` component will no accept your custom component.

For example, let's imagine you have this form to collect a list of favorite fruits:

```ts
import TypeForm from 'typeforms';

interface MyForm {
  fruits: string[];
}

const { Form } = TypeForm<MyForm>();

const MyForm = () => {
  return (
    <Form onSubmit={...}>
      <button type="submit">Submit</button>
    </Form>
  );
};
```

You will have to define your custom field component that can handle a field of type `string[]`. which will look something like this:

```tsx
import { ChangeEvent } from 'react';
import { CustomFieldProps } from 'typeforms';

interface FavoriteFruitsProps extends CustomFieldProps<string[]> {} // It's important to define the type of fields your component can handle

const FavoriteFruits = (props: FavoriteFruitsProps) => {
  const { value, setValue } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newFruits = value ? [...value] : [];
    if (event.target.checked) newFruits.push(event.target.value);
    else newFruits = newFruits.filter((fruit) => fruit !== event.target.value);
    setValue(newFruits);
  };

  const isChecked = (fruit: string) => value?.includes(fruit);

  return (
    <>
      <input type="checkbox" checked={isChecked('apple')} value="apple" onChange={onChange} />
      <input type="checkbox" checked={isChecked('banana')} value="banana" onChange={onChange} />
      <input type="checkbox" checked={isChecked('lemon')} value="lemon" onChange={onChange} />
    </>
  );
};

export default FavoriteFruits;
```

And then you can use it in your form like this:

```tsx
import TypeForm from 'typeforms';
import FavoriteFruits from './FavoriteFruits'

interface MyForm {
  fruits: string[];
}

const { Form, Field } = TypeForm<MyForm>();

const MyForm = () => {
  return (
    <Form onSubmit={...}>
      <Field name="fruits" component={FavoriteFruits} />
      <button type="submit">Submit</button>
    </Form>
  );
};
```

If you need to change the field behavior in relation to the form context (like skipping certain validation trigger), use the `Field` component props.
Most of the time, your custom components will only care about how to display the field and errors in the UI, and how to update the field value within the form context.

The props injected into your custom component are a few more that the ones shown in the example above,
you can check more detailed information about them in the [Field](/components/Field) component page.
