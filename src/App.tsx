import React from 'react';
import Search from './features/search/Search';
import MovieDetails from './features/movieDetails/MovieDetails';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/movie-details/:imdbID" component={MovieDetails} />
          {/* <Route path='/movie-details/:imdbID' render={(props) => {
            return ( <MovieDetails {...props} /> )
          }} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
