import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import * as api from "../src/api/libraryApi";
it("places unresolved authors in a final Unknown author group", async () => {
  render(<App level={4} />);
  expect(await screen.findByText("An Unattributed Journey")).toBeVisible();
  const regions = screen.getAllByRole("region");
  expect(regions.at(-1)).toHaveAccessibleName("Unknown author");
  expect(
    within(regions.at(-1)).getByText("Author: Unknown author"),
  ).toBeVisible();
});
it("sorts year descending with missing years last, and can return to author order", async () => {
  vi.spyOn(api, "getBooks").mockResolvedValue([
    { id: "1", title: "Alpha", authorId: "a" },
    { id: "2", title: "Zulu", authorId: "a", year: 2020 },
    { id: "3", title: "Beta", authorId: "a", year: 1990 },
    { id: "4", title: "Able", authorId: "a", year: 2020 },
  ]);
  vi.spyOn(api, "getAuthor").mockResolvedValue({
    id: "a",
    firstName: "A",
    lastName: "B",
  });
  render(<App level={4} />);
  await screen.findByText("Alpha");
  await userEvent.selectOptions(screen.getByLabelText("Sort books"), "year");
  expect(
    screen.getAllByRole("heading", { level: 4 }).map((n) => n.textContent),
  ).toEqual(["Able", "Zulu", "Beta", "Alpha"]);
  await userEvent.selectOptions(screen.getByLabelText("Sort books"), "author");
  expect(
    screen.getAllByRole("heading", { level: 4 }).map((n) => n.textContent),
  ).toEqual(["Able", "Alpha", "Beta", "Zulu"]);
});
