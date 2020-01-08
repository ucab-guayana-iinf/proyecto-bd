import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { SnackbarProvider } from 'notistack';
// import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
// import { configureStore } from './redux/store';

// NOTE: redux is not used

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

// const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
