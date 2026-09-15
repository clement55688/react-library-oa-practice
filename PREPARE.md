# React OA practice — start here

## Before you start

Be comfortable with React components and props, useState, controlled forms, validation, immutable array updates, useEffect, async/await, handling API errors, and JavaScript grouping/sorting. Practice reading test failures and inspecting browser console output.

## Exercise

Build a library catalog in React. Allow 60–75 minutes for the first three levels:

1. Display book cards grouped by the first letter of the author's last name, in alphabetical order.
2. Add a book form with required title and author names, an optional year, validation, and field reset after submission.
3. Load books and authors through the supplied asynchronous mock API. Join their data, omit books whose author returns 404, and omit absent years. Show loading and failure states.

Optional extension: retain missing-author books in an Unknown author group and add newest-year-first sorting. This is an original practice extension.

## In the sandbox

Fork your own copy before editing. Open README.md for exact requirements, then start in src/App.jsx with `import books from "./book.json";`. The `src/book.json` data for Exercises 1–2 and the mock API for Exercise 3 are already provided. The starter is intentionally incomplete.

Run `npm run dev` for the preview and `npm test` for acceptance tests. Initial test failures are expected. Use `npm run test:level1`, then level2 and level3, as you progress. Ask your recruiter about allowed resources, AI assistance and submission expectations.

This is independently reconstructed practice material, not an official CodeSignal assessment.
