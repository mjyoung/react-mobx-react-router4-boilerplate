import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import styles from '../styles/components/TopBar.scss';

@inject('store') @observer
export default class TopBar extends Component {
  render() {
    return (
      <div className={styles.topbar}>
        Top Bar
      </div>
    );
  }
}
