import type { SelectProps } from "@mui/material/Select";
import type { ReactNode } from "react";

export interface SelectOption {
  /** Unique, stable identifier used as the option's value and React key. */
  value: string | number;
  /** Text shown in the dropdown and matched against the search query. */
  label: string;
  /** Disables this individual option. */
  disabled?: boolean;
}

export interface SearchableSelectProps
  extends Omit<SelectProps<string | number>, "value" | "onChange" | "children"> {
  /** Options rendered in the dropdown list. */
  options: SelectOption[];
  /** Label rendered above/inside the field. */
  label?: string;
  /** Currently selected value. Must match one of `options[].value`. */
  value: string | number;
  /** Called with the newly selected option's value. */
  onChange: (value: string | number) => void;
  /** Shows a loading spinner in place of the dropdown arrow and disables interaction. */
  loading?: boolean;
  /** Shows the in-menu search field. Defaults to true. */
  hasSearch?: boolean;
  /** Placeholder text for the search input. */
  searchPlaceholder?: string;
  /** Debounce delay (ms) applied to the search filter. Defaults to 0 (no debounce). */
  searchDebounceMs?: number;
  /** Rendered when no options match the current search query. */
  noOptionsContent?: ReactNode;
}
