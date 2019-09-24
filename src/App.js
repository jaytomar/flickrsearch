import React from 'react';
import SearchBox from './SearchBox'
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div>
      <Route path='/' component={SearchBox}/>
      <Route path='/?q=' component={SearchBox}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
