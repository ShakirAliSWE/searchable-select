# @shakiraliswe/searchable-select

A searchable, accessible [MUI](https://mui.com) `Select` component for React —
with an in-menu search field, loading state, and full TypeScript support.

[![npm version](https://img.shields.io/npm/v/@shakiraliswe/searchable-select.svg)](https://www.npmjs.com/package/@shakiraliswe/searchable-select)
[![CI](https://github.com/shakiraliswe/searchable-select/actions/workflows/ci.yml/badge.svg)](https://github.com/shakiraliswe/searchable-select/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Features

- 🔍 Built-in search field inside the dropdown menu
- ♿ Accessible — proper labeling and `role="searchbox"` for the search input
- ⏳ Optional loading state with an animated icon
- 🧩 Fully typed with TypeScript, ships its own `.d.ts`
- 📦 Tiny — MUI, Emotion, and React are peer dependencies, not bundled
- 🌲 Tree-shakeable (`sideEffects: false`), ESM + CJS output

## Installation

```bash
npm install @shakiraliswe/searchable-select
```

This package has peer dependencies you need in your app already:

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Usage

```tsx
import { useState } from "react";
import { SearchableSelect } from "@shakiraliswe/searchable-select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

function Example() {
  const [value, setValue] = useState<string | number>("apple");

  return <SearchableSelect label="Fruit" options={options} value={value} onChange={setValue} />;
}
```

### Loading state

```tsx
<SearchableSelect
  label="Fruit"
  options={options}
  value={value}
  onChange={setValue}
  loading={isFetchingOptions}
/>
```

### Debounced search (recommended for large lists)

```tsx
<SearchableSelect
  label="Country"
  options={countries}
  value={value}
  onChange={setValue}
  searchDebounceMs={200}
/>
```

## Props

| Prop                | Type                                | Default               | Description                                                              |
| ------------------- | ----------------------------------- | --------------------- | ------------------------------------------------------------------------ |
| `options`           | `SelectOption[]`                    | —                     | **Required.** Options rendered in the dropdown.                          |
| `value`             | `string \| number`                  | —                     | **Required.** Currently selected value.                                  |
| `onChange`          | `(value: string \| number) => void` | —                     | **Required.** Called when a new option is selected.                      |
| `label`             | `string`                            | `""`                  | Field label.                                                             |
| `loading`           | `boolean`                           | `false`               | Shows a spinner in place of the dropdown arrow and disables the control. |
| `hasSearch`         | `boolean`                           | `true`                | Show/hide the in-menu search field.                                      |
| `searchPlaceholder` | `string`                            | `"Type to search..."` | Placeholder text for the search input.                                   |
| `searchDebounceMs`  | `number`                            | `0`                   | Debounce delay applied to the search filter.                             |
| `noOptionsContent`  | `ReactNode`                         | `"No options found"`  | Rendered when no options match the search query.                         |

`SearchableSelect` also accepts all other props of MUI's `Select` (except
`value`, `onChange`, and `children`, which are controlled by this component),
and forwards a `ref` to the underlying `FormControl`.

```ts
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

### Demo

[Click to view demo](https://searchable-select.lovable.app).

## License

MIT © [shakiraliswe](https://github.com/shakiraliswe)
