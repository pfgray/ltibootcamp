import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';

import Home from './Home';
import Tools from './Tools';

class App extends React.Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <Header />
            <Route exact path="/" component={Home as any} />
            <Route path="/tools" component={Tools as any} />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
