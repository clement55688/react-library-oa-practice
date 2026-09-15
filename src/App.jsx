import { useState } from "react";
import books from "./book.json";
import AddBookForm from "./AddBookForm";
// Exercise 1: `books` is supplied above. TODO: render it with BookCard and GroupContainer.
// Exercise 3: replace local data with the supplied mock API.
export default function App({ level = 3 }) {
  const [selected, setSelected] = useState(level);
  // TODO L1: catalog state and grouping. L2: immutable additions.
  // TODO L3: asynchronous loading, author joins, 404 handling, loading/error/retry.
  // TODO L4: preserve unknown-author books and support year sorting.
  return (
    <main>
      <header>
        <small>FRONTEND PRACTICE / 60–75 MINUTES</small>
        <h1>Library Management System</h1>
        <label htmlFor="level">Practice level</label>
        <select
          id="level"
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n === 4 ? "Practice Level 4" : "Level " + n}
            </option>
          ))}
        </select>
      </header>
      <div className="layout">
        {selected >= 2 ? (
          <AddBookForm onAdd={() => {}} />
        ) : (
          <aside>Start with local data.</aside>
        )}
        <div>
          <h2>Catalog</h2>
          <p>Implement the catalog here.</p>
        </div>
      </div>
    </main>
  );
}
