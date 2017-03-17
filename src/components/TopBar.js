import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
export default class TopBar extends Component {
  render() {
    return (
      <div>
        Top Bar
      </div>
    );
  }
}
