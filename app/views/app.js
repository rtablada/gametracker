import store from '../store';
import FormView from './form';


export default class AppView {
  constructor(el) {
    this.el = el;
    this.store = store;
    this.formView = new FormView(el.querySelector('.create-form'), this.store);
  }

  created() {
    // Setup listen for state change and store in localStorage
    this.store.subscribe(() => {
      localStorage.gameTracker = JSON.stringify(this.store.getState().games);
    });

    // Mount Form view
    this.formView.mounted();
    // Mount list view

    // Figure out old data
    this.store.dispatch({
      type: 'GAME@FIND_ALL:COMPLETE',
      data: JSON.parse(localStorage.gameTracker || '[]'),
    });
  }
}
