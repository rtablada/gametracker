import store from '../store';
import FormView from './form';
import ListView from './list';


export default class AppView {
  constructor(el) {
    this.el = el;
    this.store = store;
    this.formView = new FormView(el.querySelector('.create-form'), this.store);
    this.listView = new ListView(el.querySelector('.game-list'), this.store);
  }

  created() {
    // Setup listen for state change and store in localStorage
    this.store.subscribe(() => {
      localStorage.gameTracker = JSON.stringify(this.store.getState().games);
    });

    // Mount Form view
    this.formView.mounted();
    // Mount list view
    this.listView.mounted();

    // Figure out old data
    this.store.dispatch({
      type: 'GAME@FIND_ALL:COMPLETE',
      data: JSON.parse(localStorage.gameTracker || '[]'),
    });
  }
}
