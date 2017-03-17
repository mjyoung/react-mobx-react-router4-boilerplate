import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>React MobX React-Router 4 Boilerplate</h1>
        </div>
      </div>
    );
  }

}
