import React from "react";
import { Link } from "react-router-dom";

export default function BookListItem(props) {
  const book = props.book;

  return (
    <Link to={`/books/${book.isbn}`} className="item ui container">
      {book.thumbnails && book.thumbnails[0] && book.thumbnails[0].url && (
        <img className="ui tiny image" alt="" src={book.thumbnails[0].url} />
      )}
      <div className="content">
        <div className="header">{book.title}</div>
        {book.subtitle && <div className="description">{book.subtitle}</div>}
        <div className="metadata">
          {book.authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
          <br />
          ISBN {book.isbn}
        </div>
      </div>
    </Link>
  );
}
