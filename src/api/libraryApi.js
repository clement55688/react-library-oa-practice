import { books, authors } from "../data/mockData";
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
const delay = () => new Promise((resolve) => setTimeout(resolve, 25));
// Promises resolve to data (not Response objects). Unknown authors reject with status 404.
export async function getBooks() {
  await delay();
  return books.map((book) => ({ ...book }));
}
export async function getAuthor(id) {
  await delay();
  const author = authors.find((a) => a.id === id);
  if (!author) throw new ApiError(404, "Author not found");
  return { ...author };
}
