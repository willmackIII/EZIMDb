import React from 'react';
import Search from './features/search/Search';
import MovieDetails from './features/movieDetails/MovieDetails';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Route path="/test" render={() => <div>Test Route</div>} /> */}
        <Switch>
          <Route path="/movie-details/:imdbID" component={MovieDetails} />
          <Route exact path="/" component={Search} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
