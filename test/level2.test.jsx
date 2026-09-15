import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import AddBookForm from "../src/AddBookForm";
it.each(["title", "authorFirst", "authorLast"])(
  "rejects whitespace in required %s",
  async (missing) => {
    const add = vi.fn();
    render(<AddBookForm onAdd={add} />);
    const u = userEvent.setup();
    for (const [name, label] of [
      ["title", "Title*"],
      ["authorFirst", "Author First Name*"],
      ["authorLast", "Author Last Name*"],
    ])
      await u.type(
        screen.getByPlaceholderText(label),
        name === missing ? "   " : "Valid",
      );
    await u.click(screen.getByRole("button", { name: "Add new book" }));
    expect(add).not.toHaveBeenCalled();
  },
);
it("rejects empty required fields", async () => {
  const add = vi.fn();
  render(<AddBookForm onAdd={add} />);
  await userEvent.click(screen.getByRole("button", { name: "Add new book" }));
  expect(add).not.toHaveBeenCalled();
});
it("adds one trimmed book to a new group and clears every input", async () => {
  render(<App level={2} />);
  const u = userEvent.setup();
  await u.type(screen.getByPlaceholderText("Title*"), "  New Book  ");
  await u.type(screen.getByPlaceholderText("Author First Name*"), " Ada ");
  await u.type(screen.getByPlaceholderText("Author Last Name*"), " Lovelace ");
  await u.type(screen.getByPlaceholderText("Year"), "1843");
  await u.click(screen.getByRole("button", { name: "Add new book" }));
  expect(screen.getAllByRole("heading", { name: "New Book" })).toHaveLength(1);
  const group = screen.getByRole("region", { name: "L", exact: true });
  expect(within(group).getByText("Author: Ada Lovelace")).toBeVisible();
  expect(within(group).getByText("Year: 1843")).toBeVisible();
  for (const label of ["Title*", "Author First Name*", "Author Last Name*"])
    expect(screen.getByPlaceholderText(label)).toHaveValue("");
  expect(screen.getByPlaceholderText("Year")).toHaveValue(null);
});
it("generates distinct IDs and omits blank optional year", async () => {
  const add = vi.fn();
  render(<AddBookForm onAdd={add} />);
  for (let i = 0; i < 2; i++) {
    for (const label of ["Title*", "Author First Name*", "Author Last Name*"])
      await userEvent.type(screen.getByPlaceholderText(label), "Example");
    await userEvent.click(screen.getByRole("button", { name: "Add new book" }));
  }
  expect(add).toHaveBeenCalledTimes(2);
  expect(add.mock.calls[0][0].id).toBeTruthy();
  expect(add.mock.calls[0][0].id).not.toBe(add.mock.calls[1][0].id);
  expect(add.mock.calls[0][0].year).toBeUndefined();
});
