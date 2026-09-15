# Library frontend OA practice

**[Open this starter in StackBlitz](https://stackblitz.com/github/clement55688/react-library-oa-practice?file=README.md)** to code in the browser. Fork a copy before editing. The [original StackBlitz starter](https://stackblitz.com/edit/tz2afjmf?file=README.md) is also available.

This is an independently reconstructed practice exercise inspired by a frontend coding-assessment format. It is not an official CodeSignal question and does not use CodeSignal's private APIs or hidden tests.

## Quick start

Use Node.js 22.12+ and npm. In this folder run:

```sh
npm install
npm run dev
npm test
npm run build
```

Open the local URL printed by Vite. Tests run once; use `npm run test:watch` for watch mode. Run one level with `npm run test:level1` (or level2, level3, level4). All tests are visible acceptance tests, not a secure or hidden grading service. Starter tests intentionally fail until implemented; solution tests should all pass.

## Format

Budget 60–75 minutes for Levels 1–3. Practice Level 4 is an optional 15–20 minute extension. Complete each level cumulatively. Use React, JavaScript/JSX, Vite, Vitest, React Testing Library and plain CSS. No backend or external API is needed. Run the starter at Level 1 initially using its level selector. App supports an optional numeric `level` prop for tests and defaults to Level 3. Changing levels resets the catalog; persistence is out of scope.

## Level 1 — Display the catalog

Import `books` directly from `src/book.json` for Levels 1–2: `import books from "./book.json";` in `App.jsx`. Every book has its author data in the JSON file, so no API call is needed until Level 3. Render a Catalog heading, sections grouped by the uppercase first letter of each author's trimmed last name, and one BookCard per book. Group labels ascend alphabetically. Within a group sort by last name, then title, then ID for ties; compare English text case-insensitively. Do not mutate input arrays.

Each card is an article with a level-four heading containing its title, followed by `Author: FirstName LastName`. Render `Year: 1984` when supplied; omit the entire year line for undefined, null or empty-string years. Each GroupContainer is a section with aria-label equal to the group label and a level-three heading. Use stable IDs for React keys.

## Level 2 — Add a book

Build AddBookForm with controlled inputs using useState. Required text inputs are `name="title" placeholder="Title*"`, `name="authorFirst" placeholder="Author First Name*"`, and `name="authorLast" placeholder="Author Last Name*"`. Optional year uses `name="year" type="number" placeholder="Year"`. Use `<input type="submit" value="Add new book" />` and accessible labels.

Trim required values; empty or whitespace-only values must not add a book. A supplied year must be an integer (no arbitrary historical range). Generate a locally unique ID, call onAdd with `{id,title,author:{id,firstName,lastName},year?}`, append immutably, place the book in its sorted group, and clear all four inputs only on success. Duplicate titles are allowed; distinct submissions need distinct IDs. Omit the year property when blank.

## Level 3 — Retrieve books and authors

Replace local initialization with the provided asynchronous mock functions. `getBooks()` resolves to an array of `{id,title,authorId,year?}`. `getAuthor(authorId)` resolves to `{id,firstName,lastName}` or rejects with an ApiError whose status is 404. These functions return data directly, not fetch Response objects; do not call .json().

Fetch books, retrieve each associated author, and combine records. Sequential requests are sufficient. Omit books whose author lookup returns 404. Preserve optional-year behavior. Show `Loading catalog…` in a status region. For a books failure or a non-404 author failure, show an alert containing `Unable to load catalog` and a Retry button. A successful empty response shows `No books to display.` Do not silently discard server errors. Prevent obsolete requests from updating state after unmount or a level change. The add form becomes available after loading succeeds; locally added books remain in memory until reset or reload.

## Practice Level 4 — Original extension

This level is our own exercise, not a claim about the original assessment's unrecovered Level 4. Preserve books with 404 authors and display them in a final `Unknown author` group with `Author: Unknown author`. Known groups remain alphabetic. Add a select labeled `Sort books`: value `author` uses Level 1 ordering; value `year` sorts within each group by newest year first, missing years last, and Level 1 ordering for ties. Changing sorting must preserve every book and keep Unknown author last. Non-404 errors still fail visibly.

## Files and responsibilities

```text
src/
  App.jsx                 state, loading, level selection, catalog
  AddBookForm.jsx          controlled form
  BookCard.jsx            single book
  GroupContainer.jsx      labeled group
  catalog.js              optional pure grouping/sorting helper
  book.json               supplied joined records for Levels 1–2
  api/libraryApi.js       provided asynchronous mock API
  data/mockData.js         provided fixture records
  index.jsx, index.css     entry point and simple styling
test/
  setup.js
  level1.test.jsx
  level2.test.jsx
  level3.test.jsx
  level4.test.jsx
```

## What this assessment tests

React component design; useState; controlled forms; validation; immutable state updates; useEffect; asynchronous JavaScript; API fetching and joining related records; 404 handling; conditional rendering; grouping; deterministic sorting; debugging with unit tests.

## Submission

Return source code, lockfile and a short note listing completed levels, commands run, remaining issues and any assistance used. Exclude node_modules, dist and secrets. Follow the recruiter's stated policy on documentation and AI assistance. The provided tests guide behavior; reviewers should also inspect code and manually exercise the UI.

## Assumptions

The latest written reconstruction is authoritative for this practice package; earlier screenshots were not transcribed as an official question. Grouping is by surname initial. Title and ID tie-breaks, integer-year validation, explicit error/retry behavior and Level 4 are defined here to make the exercise unambiguous. Book metadata is mock fixture data, not bibliographic reference material. No real assessment URLs, copied assets, proctoring or private tests are included.
