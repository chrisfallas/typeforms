---
title: Select
sidebar:
  order: 6
---

# Select

Select provides a strongly-typed dropdown component bound to a union or enum-like field.
It maps your defined options to labeled selections and enforces that only valid values (based on your schema) are selectable.
This eliminates the need for manual type guards or option validation, and guarantees that your form state will never contain invalid selections.

## Props

The `Select` component extends `SelectHTMLAttributes` inheriting all related props, and additionally accepts the following props:

| Name                                                                                      | Type                                   | Required                           | Default                                 |
|-------------------------------------------------------------------------------------------|----------------------------------------|------------------------------------|-----------------------------------------|
| <b>name</b><br/>The name of the field in the form schema that the input will be bound to. | <span class="nowrap">`string`</span>   | <span class="nowrap">`true`</span> | <span class="nowrap">`undefined`</span> |
| <b>options</b><br/>The list of options to display in the dropdown menu.                   | <span class="nowrap">`array`</span>    | <span class="nowrap">`true`</span> | <span class="nowrap">`undefined`</span> |
| <b>onChange</b><br/>Callback function that is called when the field value changes.        | <span class="nowrap">`function`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>validation</b><br/>Validation rules for the field.                                     | <span class="nowrap">`object`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>validateOnMount</b><br/>Boolean indicating whether to validate the field on mount.     | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`false`</span> |
| <b>validateOnSubmit</b><br/>Boolean indicating whether to validate the field on submit.   | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>validateOnChange</b><br/>Boolean indicating whether to validate the field on change.   | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>validateOnBlur</b><br/>Boolean indicating whether to validate the field on blur.       | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`true`</span> |
| <b>fieldRef</b><br/>A ref object that can be used to access the field context.            | <span class="nowrap">`ref`</span>      | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>domRef</b><br/>A ref object that can be used to access the DOM element of the field.   | <span class="nowrap">`ref`</span>      | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
