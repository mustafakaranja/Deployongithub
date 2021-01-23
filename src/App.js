import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import history from "./History/history";
import StreamCreate from "./Streams/StreamCreate";
import StreamDelete from "./Streams/StreamDelete";
import StreamEdit from "./Streams/StreamEdit";
import StreamList from "./Streams/StreamList";
import StreamShow from "./Streams/StreamShow";
import Footer from "./Components/Footer";

const App = () => {
  document.title = "Best Entertainment";
  return (
    <>
      <Router history={history}>
        <Header />

        <div>
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" component={StreamCreate} />
            <Route path="/streams/edit/:id" component={StreamEdit} />
            <Route path="/streams/delete/:id" component={StreamDelete} />
            <Route path="/streams/:id" component={StreamShow} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
