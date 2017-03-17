import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';
import AppStore from './stores/AppStore';
import AnotherStore from './stores/AnotherStore';

const appStore = new AppStore();
const anotherStore = new AnotherStore();

const store = {
  appStore, anotherStore
};

ReactDOM.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      <AppContainer>
        <App store={store} />
      </AppContainer>
      ,
      document.getElementById('root')
    );
  });
}
