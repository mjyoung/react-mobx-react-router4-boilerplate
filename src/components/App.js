import React, { Component, PropTypes } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import { Provider, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Home from './Home';
import TopBar from './TopBar';
import NotFound from './NotFound';

import '../styles/main.scss';
import styles from '../styles/components/App.scss';

@observer
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={this.props.store}>
          <div className={styles.wrapper}>
            <DevTools />
            <TopBar />

            <Match exactly pattern="/" component={Home} />
            <Miss component={NotFound} />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({})
};

App.defaultProps = {
  store: PropTypes.shape({})
};
