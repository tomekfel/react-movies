import React, { Component } from 'react';
import './App.css';

import NavBar from './components/navbar/NavBar';
import Search from './components/search/Search';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavbarBottom from './components/navbar-bottom/NavbarBottom';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Search />
          <NavbarBottom />
        </div>
      </MuiThemeProvider>
      
    );
  }
}

export default App;
