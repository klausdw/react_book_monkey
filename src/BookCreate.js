import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { bookApi } from "./BookApi";

export default function BookCreate() {
  // Lang-Schreibweise Objekt: { title: title, url: url }
  const buildThumbnail = (title, url) => ({ title, url });

  const [title, setTitle] = useState("Mein neues Buch");
  const [subtitle, setSubtitle] = useState("sub sub");
  const [isbn, setIsbn] = useState(
    Math.floor(Math.random() * 9999999999999 + 1111111111).toString()
  );
  const [description, setDescription] = useState("desc");
  const [authors, setAuthors] = useState(["Max", "Mux"]);
  const [thumbnails, setThumbnails] = useState([
    buildThumbnail("title", "https://ng-buch.de/public/monkey-thinking.svg"),
  ]);
  const [published, setPublished] = useState("2020-05-21");

  const history = useHistory();

  const book = () => {
    return {
      title,
      subtitle,
      isbn,
      description,
      authors,
      thumbnails,
      published,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stops default reloading behaviour
    bookApi("post", "books", () => history.push("/books"), book());
  };

  const onChangeAuthor = (value, index) => {
    setAuthors((_authors) => {
      const copyAuthors = [..._authors];
      copyAuthors[index] = value;
      return copyAuthors;
    });
  };

  const onChangeThumbnail = (value, index, name) => {
    setThumbnails((_thumbnails) => {
      const copyThumbnails = [..._thumbnails];
      copyThumbnails[index][name] = value;
      return copyThumbnails;
    });
  };

  const onAddThumbnail = () => {
    setThumbnails((_thumbnails) => {
      return [..._thumbnails, buildThumbnail("", "")];
    });
  };

  const onRemoveThumbnail = () => {
    setThumbnails((_thumbnails) => {
      const copyThumbnails = [..._thumbnails].reverse();
      // lastThumbnail is first, cause of reverse() -> rest element must be last
      // eslint-disable-next-line no-unused-vars
      const [lastThumbnail, ...newThumbnails] = copyThumbnails;
      return newThumbnails.reverse();
    });
  };

  const onAddAuthor = () => {
    setAuthors((_authors) => [..._authors, ""]);
  };

  const onRemoveAuthor = () => {
    setAuthors((_authors) => {
      const copyAuthors = [..._authors].reverse();
      // lastAuthor is first, cause of reverse() -> rest element must be last
      // eslint-disable-next-line no-unused-vars
      const [lastAuthor, ...newAuthors] = copyAuthors;
      return newAuthors.reverse();
    });
  };

  return (
    <div className="ui container">
      <form className="ui form" onSubmit={handleSubmit}>
        <label>Buchtitel</label>
        <input
          placeholder="Titel"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>Untertitel</label>
        <input
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => {
            setSubtitle(e.target.value);
          }}
        />

        <label>Isbn</label>
        <input
          placeholder="Isbn"
          value={isbn}
          onChange={(e) => {
            setIsbn(e.target.value);
          }}
        />

        <label>Erscheinungsdatum</label>
        <input
          type="date"
          value={published}
          onChange={(e) => {
            setPublished(e.target.value);
          }}
        />

        <label>Authoren</label>
        <button className="ui mini button" type="button" onClick={onAddAuthor}>
          +
        </button>
        <button
          className="ui mini button"
          type="button"
          onClick={onRemoveAuthor}
        >
          -
        </button>
        {authors.map((author, index) => (
          <div key={index} className="sixteen wide field">
            <input
              placeholder="Autor"
              value={author}
              onChange={(e) => {
                onChangeAuthor(e.target.value, index);
              }}
            />
          </div>
        ))}

        <label>Beschreibung</label>
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label>Bilder</label>
        <button
          className="ui mini button"
          type="button"
          onClick={onAddThumbnail}
        >
          +
        </button>
        <button
          className="ui mini button"
          type="button"
          onClick={onRemoveThumbnail}
        >
          -
        </button>
        {thumbnails.map((thumbnail, index) => (
          <div key={index} className="field">
            <input
              placeholder="Url"
              className="nine wide field"
              value={thumbnail.url}
              onChange={(e) => {
                onChangeThumbnail(e.target.value, index, "url");
              }}
            />
            <input
              placeholder="Titel"
              className="seven wide field"
              value={thumbnail.title}
              onChange={(e) => {
                onChangeThumbnail(e.target.value, index, "title");
              }}
            />
          </div>
        ))}
        <button className="ui button">Submit</button>
      </form>
    </div>
  );
}
