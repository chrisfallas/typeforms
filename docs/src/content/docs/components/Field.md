---
title: Field
sidebar:
  order: 7
---

# Field

The Field component is a High Order Component (HOC) that injects the field context into a
custom component as props, providing everything needed to interact with the form context.
It is designed to be the controller in between the form and your custom form elements.

## Props

The `Field` component accepts the following props:

| Name                                                                                      | Type                                    | Required                            | Default                                 |
|-------------------------------------------------------------------------------------------|-----------------------------------------|-------------------------------------|-----------------------------------------|
| <b>name</b><br/>The name of the field in the form schema that the input will be bound to. | <span class="nowrap">`string`</span>    | <span class="nowrap">`true`</span>  | <span class="nowrap">`undefined`</span> |
| <b>component</b><br/>The component function that renders the custom input.                | <span class="nowrap">`component`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>onChange</b><br/>Callback function that is called when the field value changes.        | <span class="nowrap">`function`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>validation</b><br/>Validation rules for the field.                                     | <span class="nowrap">`function`</span>    | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>validateOnMount</b><br/>Boolean indicating whether to validate the field on mount.     | <span class="nowrap">`boolean`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`false`</span> |
| <b>validateOnSubmit</b><br/>Boolean indicating whether to validate the field on submit.   | <span class="nowrap">`boolean`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>validateOnChange</b><br/>Boolean indicating whether to validate the field on change.   | <span class="nowrap">`boolean`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>validateOnBlur</b><br/>Boolean indicating whether to validate the field on blur.       | <span class="nowrap">`boolean`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>fieldRef</b><br/>A ref object that can be used to access the field context.            | <span class="nowrap">`ref`</span>       | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
