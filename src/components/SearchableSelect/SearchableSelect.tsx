import { forwardRef, useCallback, useId, useMemo, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import IconDownArrow from "@mui/icons-material/KeyboardArrowDown";
import IconCross from "@mui/icons-material/Close";

import IconLoading from "../../shared/IconLoading";
import { useDebouncedValue } from "../../shared/hooks/useDebouncedValue";
import type { SearchableSelectProps } from "./SearchableSelect.types";

// Defined once, outside the component, so its identity never changes across
// renders — passing a fresh arrow function to `IconComponent` every render
// would force MUI to remount the icon on every keystroke.
const LoadingIcon = () => <IconLoading />;

const SearchableSelect = forwardRef<HTMLDivElement, SearchableSelectProps>(
  (
    {
      options,
      label = "",
      value,
      onChange,
      loading = false,
      hasSearch = true,
      searchPlaceholder = "Type to search...",
      searchDebounceMs = 0,
      noOptionsContent = "No options found",
      size = "small",
      required = false,
      disabled = false,
      ...selectProps
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebouncedValue(searchQuery, searchDebounceMs);
    const labelId = useId();

    const filteredOptions = useMemo(() => {
      if (!debouncedQuery) return options;
      const query = debouncedQuery.toLowerCase();
      return options.filter((option) => option.label.toLowerCase().includes(query));
    }, [debouncedQuery, options]);

    // Dev-only sanity check for a common integration bug.
    if (process.env.NODE_ENV !== "production") {
      const seen = new Set<string | number>();
      for (const option of options) {
        if (seen.has(option.value)) {
          // eslint-disable-next-line no-console
          console.warn(
            `SearchableSelect: duplicate option value "${option.value}" detected. Option values must be unique.`,
          );
        }
        seen.add(option.value);
      }
    }

    const handleSelectChange = useCallback(
      (event: { target: { value: unknown } }) => {
        onChange(event.target.value as string | number);
      },
      [onChange],
    );

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    }, []);

    const handleClearSearch = useCallback(() => setSearchQuery(""), []);

    const handleClose = useCallback(() => setSearchQuery(""), []);

    const handleSearchKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
      // Let Escape bubble so MUI can close the menu; swallow everything else
      // so typing doesn't trigger Select's built-in "jump to option by first
      // letter" behavior.
      if (event.key !== "Escape") {
        event.stopPropagation();
      }
    }, []);

    // The selected value is still valid even if the current search hides it —
    // don't blank the displayed value just because a filter is active.
    const isValueInOptions = useMemo(
      () => options.some((option) => option.value === value),
      [options, value],
    );

    return (
      <FormControl fullWidth size={size} required={required} ref={ref}>
        {label && (
          <InputLabel id={labelId} disabled={disabled}>
            {label}
          </InputLabel>
        )}
        <Select
          labelId={label ? labelId : undefined}
          label={label}
          value={isValueInOptions ? value : ""}
          onChange={handleSelectChange}
          IconComponent={loading ? LoadingIcon : IconDownArrow}
          disabled={disabled || loading}
          onClose={handleClose}
          MenuProps={{
            autoFocus: false,
            PaperProps: {
              style: {
                maxHeight: 300,
                scrollbarWidth: "none",
                borderRadius: 8,
              },
            },
          }}
          {...selectProps}
        >
          {hasSearch && (
            <ListSubheader sx={{ p: 1, pb: 0 }}>
              <TextField
                size="small"
                fullWidth
                placeholder={searchPlaceholder}
                value={searchQuery}
                disabled={loading}
                onChange={handleSearchChange}
                autoFocus
                inputProps={{
                  "aria-label": "Search options",
                  role: "searchbox",
                }}
                onKeyDown={handleSearchKeyDown}
                InputProps={{
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="Clear search"
                        title="Clear"
                        onClick={handleClearSearch}
                      >
                        <IconCross fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : undefined,
                }}
              />
            </ListSubheader>
          )}

          {filteredOptions.length === 0 && (
            <Box px={2} py={1.5}>
              <Typography variant="body2" color="text.secondary">
                {noOptionsContent}
              </Typography>
            </Box>
          )}

          {filteredOptions.map((option) => (
            <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  },
);

SearchableSelect.displayName = "SearchableSelect";

export default SearchableSelect;
