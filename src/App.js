import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";

import BookList from "./BookList";
import BookDetails from "./BookDetails";
import BookCreate from "./BookCreate";
import { bookApi } from "./BookApi";

const resetStore = () => {
  bookApi("delete", "book", () => {
    window.location.reload();
  });
};

export default function App() {
  return (
    <Router>
      <div className="ui menu">
        <NavLink to="/books" exact className="item" activeClassName="active">
          Bücher
        </NavLink>
        <NavLink to="/books/new" className="item" activeClassName="active">
          Büch einfügen +
        </NavLink>
        <a onClick={resetStore} className="item right">
          Reset Store
        </a>
      </div>

      <Switch>
        <Route path="/books/new">
          <BookCreate />
        </Route>

        <Route path="/books/:isbn">
          <BookDetails />
        </Route>

        <Route path="/books">
          <BookList />
        </Route>

        <Route path="/404">
          <p>404</p>
        </Route>

        <Route exact path="">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}
