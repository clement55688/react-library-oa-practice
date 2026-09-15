export const authors = [
  { id: "knuth", firstName: "Donald E.", lastName: "Knuth" },
  { id: "martin", firstName: "Robert C.", lastName: "Martin" },
  { id: "twain", firstName: "Mark", lastName: "Twain" },
  { id: "bradbury", firstName: "Ray", lastName: "Bradbury" },
  { id: "clancy", firstName: "Tom", lastName: "Clancy" },
  { id: "cormen", firstName: "Thomas H.", lastName: "Cormen" },
  { id: "sendak", firstName: "Maurice", lastName: "Sendak" },
];
export const books = [
  { id: "b1", title: "Fahrenheit 451", authorId: "bradbury", year: 1953 },
  {
    id: "b2",
    title: "The Hunt for Red October",
    authorId: "clancy",
    year: 1984,
  },
  { id: "b3", title: "Algorithms Unlocked", authorId: "cormen", year: 2013 },
  {
    id: "b4",
    title: "Where the Wild Things Are",
    authorId: "sendak",
    year: 1963,
  },
  { id: "b5", title: "The TeXbook", authorId: "knuth", year: 1984 },
  {
    id: "b6",
    title: "Selected Papers on Computer Languages",
    authorId: "knuth",
  },
  {
    id: "b7",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    authorId: "martin",
    year: 2008,
  },
  {
    id: "b8",
    title:
      "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    authorId: "martin",
    year: 2017,
  },
  {
    id: "b9",
    title: "Clean Agile: Back to Basics",
    authorId: "martin",
    year: 2019,
  },
  {
    id: "b10",
    title: "The Adventures of Tom Sawyer",
    authorId: "twain",
    year: 1876,
  },
  { id: "b11", title: "The Adventures of Huckleberry Finn", authorId: "twain" },
  { id: "b12", title: "An Unattributed Journey", authorId: "deleted-author" },
];
// Local joined fixtures for Levels 1–2; Level 3 must call the API instead.
export const initialBooks = books.flatMap((book) => {
  const author = authors.find((a) => a.id === book.authorId);
  return author ? [{ ...book, author: { ...author } }] : [];
});
