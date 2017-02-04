import { observable, action } from 'mobx';
require('isomorphic-fetch');

export class AppState {
    
  @observable items = [];
  @observable user = {};

  constructor(initialState) {
    this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
  }
  
  @action
  addItem(item) {
    this.items.push(item);
  }

  @action
  loadUser() {
    console.log('feeeeetch');
    return fetch('http://localhost:3000/api/user')
    .then(res => res.json())
    .then(user => {
      console.log(user);
      this.user = user;
    });
  }
  
  toJson() {
    return {
      items: this.items
    };
  }
}

export default new AppState();

