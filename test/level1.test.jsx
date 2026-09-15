import { render, screen, within } from "@testing-library/react";
import App from "../src/App";
import BookCard from "../src/BookCard";
it("renders local catalog grouped by last-name initial in alphabetical order", () => {
  render(<App level={1} />);
  expect(screen.getByRole("heading", { name: "Fahrenheit 451" })).toBeVisible();
  expect(
    screen.getAllByRole("region").map((n) => n.getAttribute("aria-label")),
  ).toEqual(["B", "C", "K", "M", "S", "T"]);
  const c = screen.getByRole("region", { name: "C", exact: true });
  expect(
    within(c)
      .getAllByRole("heading", { level: 4 })
      .map((n) => n.textContent),
  ).toEqual(["The Hunt for Red October", "Algorithms Unlocked"]);
});
it("sorts books by title for a shared surname", () => {
  render(<App level={1} />);
  const m = screen.getByRole("region", { name: "M", exact: true });
  expect(
    within(m)
      .getAllByRole("heading", { level: 4 })
      .map((n) => n.textContent),
  ).toEqual([
    "Clean Agile: Back to Basics",
    "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    "Clean Code: A Handbook of Agile Software Craftsmanship",
  ]);
});
it.each([undefined, null, ""])("omits absent year %s", (year) => {
  render(
    <BookCard
      book={{
        id: "x",
        title: "Sample",
        year,
        author: { firstName: "A", lastName: "B" },
      }}
    />,
  );
  expect(screen.queryByText(/Year:/)).not.toBeInTheDocument();
  expect(screen.getByText("Author: A B")).toBeVisible();
});
it("renders a supplied year", () => {
  render(
    <BookCard
      book={{
        title: "Sample",
        year: 2000,
        author: { firstName: "A", lastName: "B" },
      }}
    />,
  );
  expect(screen.getByText("Year: 2000")).toBeVisible();
});
