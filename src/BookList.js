import React from "react";
import BookListItem from "./BookListItem";
import useBookApi from "./BookApi";
import LoadingSpinner from "./LoadingSpinner";

export default function BookList() {
  const books = useBookApi("get", "books");

  if (!books) {
    return <LoadingSpinner name="Bücher" />;
  }

  return books.length === 0 ? (
    <p>Keine Buecher vorhanden</p>
  ) : (
    <div className="ui middle aligned selection divided list">
      {books.map((book) => (
        <BookListItem book={book} key={book.isbn} />
      ))}
    </div>
  );
}
