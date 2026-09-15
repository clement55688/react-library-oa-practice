import { useState } from "react";
export default function AddBookForm({ onAdd }) {
  // TODO: controlled inputs; trim and validate; create unique ID; call onAdd; clear on success.
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2>Add a book</h2>
      {[
        ["title", "Title*"],
        ["authorFirst", "Author First Name*"],
        ["authorLast", "Author Last Name*"],
        ["year", "Year"],
      ].map(([name, label]) => (
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            placeholder={label}
            type={name === "year" ? "number" : "text"}
          />
        </div>
      ))}
      <input type="submit" value="Add new book" />
    </form>
  );
}
