---
title: Customization
sidebar:
  order: 2
---

# Customization

Out of the box, all components from our Components API render a default HTML element,
and while sometimes styling through CSS classes is enough, it is likely that you will want to fully customize what is rendered.

For this, we provide you two ways: Global customization and Element customization.

## Global customization

To customize the default output of our components, you have to set up the [Settings Provider](/components/settingsprovider/) 
and define the `settings` prop with the components you want to override.

```tsx
import { TypeFormSettingsProvider, TypeFormsSettings } from 'typeforms';
import CustomTextField from '../components/CustomTextField.tsx'; // Your custom Text Field
import CustomSelect from '../components/CustomSelect.tsx'; // Your custom Select

const settings: TypeFormsSettings = {
  customTextField: CustomTextField,
  customSelect: CustomSelect,
};

const App = () => {
  return (
    <TypeFormSettingsProvider settings={settings}>
      {/* The rest of your app */}
    </TypeFormSettingsProvider>
  );
}
```

Once you set up the global settings, all form element components throughout the app will render the custom components you provided.

**Note**: You can also set up multiple instances of the `TypeFormSettingsProvider` component to have different overrides in different parts of the app.

## Element customization

To customize a specific form element only once, you can use the `render` prop that each component provides.

```tsx
import TypeForm from 'typeforms';

interface MyForm {
  name: string;
}

const { Form, TextField } = TypeForm<MyForm>();

const MyForm = () => {
  return (
    <Form>
      <TextField
        name="name"
        render={({ name, value = '', setValue }) => (
          <>
            <label htmlFor="name-field">{name}:</label>
            <input
              id="name-field"
              name={name}
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
          </>
        )}
      />
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </Form>
  );
};
```
