class ItemView {
  constructor(game, store) {
    this.game = game;
    this.store = store;

    this.el = document.createElement('li');
    this.el.classList.add('game');
    this.el.innerHTML = `
    <h2 class="game__name">IS THIS WORKING</h2>

    <p class="game__players">1-4 Players</p>
    <button class="game__on-campus active">On Campus</button>
    <button class="game__remove">X</button>`;
  }

  mounted() {
    this.el.querySelector('.game__remove').addEventListener('click', () => {
      this.store.dispatch({ type: 'GAME@REMOVE:COMPLETE', id: this.game._id });
    });

    this.el.querySelector('.game__on-campus').addEventListener('click', () => {
      this.store.dispatch({ type: 'GAME@UPDATE:TOGGLE_ATCAMPUS', id: this.game._id });
    });
  }

  render() {
    const minPlayers = this.game.minPlayers;
    const maxPlayers = this.game.maxPlayers;
    this.el.querySelector('.game__name').innerText = this.game.name;
    this.el.querySelector('.game__players').innerText = `${minPlayers}-${maxPlayers} Players`;

    if (this.game.atCampus) {
      this.el.querySelector('.game__on-campus').innerText = 'On Campus';
      this.el.querySelector('.game__on-campus').classList.toggle('active', false);
    } else {
      this.el.querySelector('.game__on-campus').innerText = 'At Home';
      this.el.querySelector('.game__on-campus').classList.toggle('active', true);
    }
  }
}

export default class GameList {
  constructor(el, store) {
    this.el = el;
    this.store = store;
  }

  mounted() {
    // Listen for state changes from the store
    this.store.subscribe(() => {
      // Empty the list
      this.el.innerHTML = '';

      // Create a new game item for each game in the state
      const games = this.store.getState().games;

      games.forEach((game) => {
        // Create a item view
        const view = new ItemView(game, this.store);
        view.mounted();
        view.render();

        // Append Item view element to list
        this.el.appendChild(view.el);
      });
    });
  }
}
