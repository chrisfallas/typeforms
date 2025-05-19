---
title: Error
sidebar:
  order: 8
---

# Error

The Error component renders a 

## Props

The `Field` component accepts the following props:

| Name                                                                                                 | Type                                   | Required                            | Default                                 |
|------------------------------------------------------------------------------------------------------|----------------------------------------|-------------------------------------|-----------------------------------------|
| <b>htmlFor</b><br/>The name of the field in the form schema that the error will be bound to.         | <span class="nowrap">`string`</span>   | <span class="nowrap">`true`</span>  | <span class="nowrap">`undefined`</span> |
| <b>index</b><br/>Number indicating what error message to display.                                    | <span class="nowrap">`number`</span>   | <span class="nowrap">`false`</span> | <span class="nowrap">`0`</span>         |
| <b>alwaysVisible</b><br/>Boolean indicating if the DOM element should be hidden if there's no error. | <span class="nowrap">`boolean`</span>  | <span class="nowrap">`false`</span> | <span class="nowrap">`false`</span>     |
| <b>render</b><br/>Callback function in charge of rendering the error message.                        | <span class="nowrap">`function`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>domRef</b><br/>A ref object that can be used to access the DOM element of the error message.      | <span class="nowrap">`ref`</span>      | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
