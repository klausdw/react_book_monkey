import React, { Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import useBookApi, { bookApi } from "./BookApi";
import LoadingSpinner from "./LoadingSpinner";

export default function BookDetails(props) {
  const isbn = useParams().isbn;
  const history = useHistory();
  const book = useBookApi("get", `book/${isbn}`);

  if (!book) {
    return <LoadingSpinner name="Buch" />;
  }

  const getRatings = () => {
    return Array.apply(null, { length: book.rating }).reduce(
      (acc, _, index) => {
        acc.push(index);
        return acc;
      },
      []
    );
  };

  const showList = () => {
    history.push("/books");
  };

  const deleteBook = () => {
    bookApi("delete", `books/${isbn}`, showList);
  };

  return (
    <div className="ui container">
      <h1>{book.title}</h1>
      <div className="ui divider"></div>
      <div className="ui grid">
        <div className="four wide column">
          <h4>Autoren</h4>
          {book.authors.map((author) => (
            <Fragment key={author}>{author}</Fragment>
          ))}
        </div>
        <div className="four wide column">
          <h4>ISBN</h4>
          ISBN {book.isbn}
        </div>
        <div className="four wide column">
          <h4>Erschienen</h4>
          <p>{book.date}</p>
        </div>
        <div className="four wide column">
          <h4>Rating</h4>
          {getRatings().map((key) => {
            return <i key={key} className="yellow star icon"></i>;
          })}
        </div>
        <div>
          <h4>Beschreibung</h4>
          {book.description}
        </div>
        <div className="ui small images">
          {book.thumbnails.map((thumbnail) => (
            <img key={thumbnail.title} alt="" src={thumbnail.url} />
          ))}
        </div>
      </div>
      <button onClick={showList} className="ui button">
        Zurück
      </button>
      <button onClick={deleteBook} className="ui red button">
        Buch löschen
      </button>
    </div>
  );
}
