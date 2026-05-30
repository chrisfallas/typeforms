---
title: Settings Provider
sidebar:
  order: 9
---

# Settings Provider

The `TypeFormSettingsProvider` component allows you to customize the TypeForms library.
It is totally optional, so if you don't need to customize anything, you can skip it.

## Props

The `TypeFormSettingsProvider` component accepts only one prop called `settings` which accepts the following properties:

| Name                                                                                                           | Type                                          | Required                            | Default                                 |
|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------|-------------------------------------|-----------------------------------------|
| <b>customTextField</b><br/>Overrides what the [Text Field](/components/textfield/) component renders.          | <span class="nowrap">`React Component`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>customTextArea</b><br/>Overrides what the [Text Area](/components/textarea/) component renders.             | <span class="nowrap">`React Component`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>customNumericField</b><br/>Overrides what the [Numeric Field](/components/numericfield/) component renders. | <span class="nowrap">`React Component`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>customCheckbox</b><br/>Overrides what the [Checkbox](/components/checkbox/) component renders.              | <span class="nowrap">`React Component`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
| <b>customSelect</b><br/>Overrides what the [Select](/components/select/) component renders.                    | <span class="nowrap">`React Component`</span> | <span class="nowrap">`false`</span> | <span class="nowrap">`undefined`</span> |
