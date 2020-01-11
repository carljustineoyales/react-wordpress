import React from 'react';
import Home from './components/Home'
import SinglePost from './components/SinglePost'
import {Router} from '@reach/router'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path='/'/>
        <SinglePost path='/post/:id'/>
      </Router>
    </div>
  );
}

export default App;
