import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { asyncComponent } from '../utils/lazy-load';

import TopBar from './TopBar';
import styles from './App.scss';

const Home = asyncComponent(() => import('./Home').then(module => module.default));
const NotFound = asyncComponent(() => import('./NotFound').then(module => module.default));

@observer
export default class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={this.props.store}>
          <div className={styles.wrapper}>
            {process.env.NODE_ENV === 'development' && <DevTools />}
            <TopBar />
            <div className={styles.contentWrapper}>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={Home}
                />
                <Route
                  exact
                  path="/nf"
                  component={NotFound}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
            <footer>
              Test App Footer
            </footer>
          </div>
        </Provider>
      </Router>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape().isRequired
};
