import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Search from '../search/Search';
import BookDetail from '../books/BookDetail';

export default class App extends Component {

  render() {

    return (
      <Router>
        <div>
          <Header/>
          <main>
            {<Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/search" component={Search}/>
              <Route path="/books/:id" render={({ match, history }) => {
                return <BookDetail gbID={match.params.id} history={history}/>;
              }}/>
              <Redirect to="/"/>
            </Switch>}
          </main>
        </div>
      </Router>
    );
  }
}