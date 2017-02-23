import store from '../store';

export default class AppView {
  constructor(el) {
    this.el = el;
    this.store = store;
  }

  created() {
    // Setup listen for state change and store in localStorage
    this.store.subscribe(() => {
      localStorage.gameTracker = JSON.stringify(this.store.getState().games);
    });

    // Figure out old data
    this.store.dispatch({
      type: 'GAME@FIND_ALL:COMPLETE',
      data: JSON.parse(localStorage.gameTracker || '[]'),
    });

    // Setup list view
    // Setup Form view
  }
}
