import { observable, action } from 'mobx';
require('isomorphic-fetch');

export class AppState {
    
  @observable items = [];
  @observable user = {};

  constructor(initialState) {
    this.items = initialState && initialState.appstate && initialState.appstate.items ? initialState.appstate.items : [];
    this.user = initialState && initialState.appstate && initialState.appstate.user ? initialState.appstate.user : {};
  }
  
  @action
  addItem(item) {
    this.items.push(item);
  }

  @action
  loadUser() {
    console.log('feeeeetch', this.user);

    if (this.user.firstName) {
      return Promise.resolve();
    }

    return fetch('http://localhost:3000/api/user')
    .then(res => res.json())
    .then(user => {
      console.log(user);
      this.user = user;
    });
  }
  
  toJson() {
    return {
      items: this.items,
      user: this.user
    };
  }
}

const initialState = typeof window === 'object' ? window.__INITIAL_STATE__ : undefined;

export default new AppState(initialState);
