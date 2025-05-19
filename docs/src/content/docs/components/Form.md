---
title: Form
sidebar:
  order: 1
---

# Form

The Form component provides the core infrastructure for building a typed form. Internally, it's a context provider that encapsulates
all the logic related to field registration, validation, and submission handling, providing its form elements with
everything they need to interact with the form context.

## Props

The `Form` component extends `FormHTMLAttributes` inheriting all related props, and additionally accepts the following props:

| Name                                                                                   | Type                                   | Required                            | Default                                 |
|----------------------------------------------------------------------------------------|----------------------------------------|-------------------------------------|-----------------------------------------|
| <b>initialValues</b><br/>The initial values of the form fields.                        | <span class="nowrap">`object`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>onChange</b><br/>Callback function that is called when the form values change.      | <span class="nowrap">`function`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>onSubmit</b><br/>Callback function that is called when the form is submitted.       | <span class="nowrap">`function`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>onReset</b><br/>Callback function that is called when the form is reset.            | <span class="nowrap">`function`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>validations</b><br/>An object containing validation rules for the form fields.      | <span class="nowrap">`object`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>validateOnMount</b><br/>Boolean indicating whether to validate the form on mount.   | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`false`</span> |
| <b>validateOnSubmit</b><br/>Boolean indicating whether to validate the form on submit. | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>validateOnChange</b><br/>Boolean indicating whether to validate the form on change. | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>validateOnBlur</b><br/>Boolean indicating whether to validate the form on blur.     | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>render</b><br/>Callback function in charge of rendering the form fields.            | <span class="nowrap">`function`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>formRef</b><br/>A ref object that can be used to access the form context.           | <span class="nowrap">`ref`</span>      | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>domRef</b><br/>A ref object that can be used to access the DOM element of the form. | <span class="nowrap">`ref`</span>      | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
