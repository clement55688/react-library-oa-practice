import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import * as api from "../src/api/libraryApi";
it("loads books, joins authors, skips 404, and omits missing years", async () => {
  render(<App level={3} />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading");
  expect(await screen.findByText("Author: Ray Bradbury")).toBeVisible();
  expect(screen.queryByText("An Unattributed Journey")).not.toBeInTheDocument();
  expect(
    screen
      .getByRole("heading", { name: "Selected Papers on Computer Languages" })
      .closest("article"),
  ).not.toHaveTextContent("Year:");
});
it("uses API results instead of fixture data", async () => {
  vi.spyOn(api, "getBooks").mockResolvedValue([
    { id: "custom", title: "API Only", authorId: "a" },
  ]);
  vi.spyOn(api, "getAuthor").mockResolvedValue({
    id: "a",
    firstName: "Test",
    lastName: "Zed",
  });
  render(<App level={3} />);
  expect(await screen.findByText("API Only")).toBeVisible();
  expect(screen.queryByText("Fahrenheit 451")).not.toBeInTheDocument();
});
it("shows books API failures and supports retry", async () => {
  vi.spyOn(api, "getBooks")
    .mockRejectedValueOnce(new Error("Offline"))
    .mockResolvedValue([]);
  render(<App level={3} />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Unable to load catalog",
  );
  await userEvent.click(screen.getByRole("button", { name: "Retry" }));
  expect(await screen.findByText("No books to display.")).toBeVisible();
});
it("does not silently treat author server errors as 404", async () => {
  vi.spyOn(api, "getBooks").mockResolvedValue([
    { id: "x", title: "Error", authorId: "a" },
  ]);
  vi.spyOn(api, "getAuthor").mockRejectedValue(
    new api.ApiError(500, "Server error"),
  );
  render(<App level={3} />);
  expect(await screen.findByRole("alert")).toBeVisible();
  expect(screen.queryByText("Error")).not.toBeInTheDocument();
});
it("mock API isolates responses and rejects unknown authors with status 404", async () => {
  const first = await api.getBooks();
  first[0].title = "Mutation";
  expect((await api.getBooks())[0].title).not.toBe("Mutation");
  await expect(api.getAuthor("missing")).rejects.toMatchObject({ status: 404 });
});
