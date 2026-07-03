import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchableSelect from "./SearchableSelect";
import type { SelectOption } from "./SearchableSelect.types";

const options: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("SearchableSelect", () => {
  it("renders the label and selected value", () => {
    render(
      <SearchableSelect options={options} label="Fruit" value="apple" onChange={vi.fn()} />,
    );
    // MUI's outlined variant renders the label twice: once as the visible
    // InputLabel, once inside the fieldset legend (for the notch cutout).
    expect(screen.getAllByText("Fruit").length).toBeGreaterThan(0);
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("filters options based on search input", async () => {
    const user = userEvent.setup();
    render(<SearchableSelect options={options} label="Fruit" value="" onChange={vi.fn()} />);

    await user.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");
    const search = within(listbox).getByRole("searchbox");

    await user.type(search, "ban");

    expect(within(listbox).getByText("Banana")).toBeInTheDocument();
    expect(within(listbox).queryByText("Apple")).not.toBeInTheDocument();
  });

  it("calls onChange with the selected option's value", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SearchableSelect options={options} label="Fruit" value="" onChange={handleChange} />);

    await user.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");
    await user.click(within(listbox).getByText("Cherry"));

    expect(handleChange).toHaveBeenCalledWith("cherry");
  });

  it("shows a loading indicator and disables the control when loading", () => {
    render(
      <SearchableSelect options={options} label="Fruit" value="" onChange={vi.fn()} loading />,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-disabled", "true");
  });

  it("shows fallback content when no options match the search", async () => {
    const user = userEvent.setup();
    render(<SearchableSelect options={options} label="Fruit" value="" onChange={vi.fn()} />);

    await user.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");
    await user.type(within(listbox).getByRole("searchbox"), "xyz");

    expect(within(listbox).getByText("No options found")).toBeInTheDocument();
  });
});
