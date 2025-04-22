---
title: Introduction
---

# Introduction

TypeForms is a React library designed to simplify the process of building and validating forms without boilerplate code. The main goal of this library is to encapsulate
the complexity of forms state management, providing a small set of strongly-typed unstyled components to define the form structure in a more declarative, scalable and cleaner way.

## Why TypeForms?

### Strong type safety
Although you can use this library without TypeScript, you will get the most out of it if you use it. TypeForms leverages advanced TypeScript features to provide a completely type-safe development experience,
especially by taking advantage of TypeScript's type inference, so you don't have to explicitly define the types of your form fields.

### Component-based API
Most form libraries follow a hook-based approach which can lead to a lot of boilerplate code since you are in charge of manually wiring up attributes and handlers into your inputs. While
you might also find yourself doing this with TypeForms if your form is too complex, most of the time you will be using the library components API that handle this for you, keeping your code cleaner.

### Lightweight
TypeForms is built with zero dependencies, making it a tiny library that won't bloat your bundle size.

## Installation

```bash
npm install typeforms
```

**Note**: For the sake of simplicity, the following sections include code examples that omit a lot of important things that should be done when building forms, like labels for example.
Look at them as guides on how to use the library, not as guides on how to build well-structured and semantic forms.
