import { observable, action } from 'mobx';
// import axios from 'axios';

class AnotherStore {
  @observable authenticated
  @observable authenticating
  @observable items
  @observable item

  constructor() {
    this.authenticated = false;
    this.authenticating = false;
    this.items = [];
    this.item = {};
  }

  @action setData(data) {
    this.items = data;
  }

  @action setSingle(data) {
    this.item = data;
  }
}

export default AnotherStore;
