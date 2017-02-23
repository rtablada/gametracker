import reducer from '../app/reducer';

const defaultState = Object.freeze({
  loading: false,
  showOnlyAt: null, // 'home', 'campus'
  games: [],
});

const gameOne = Object.freeze({
  _id: '1234',
  name: 'Betrayal',
  minPlayerCount: 3,
  maxPlayerCount: 5,
  atCampus: true
});

const gameTwo = Object.freeze({
  _id: '1267',
  name: 'Legendary',
  minPlayerCount: 1,
  maxPlayerCount: 4,
  atCampus: false
});

module('reducer', () => {
  test('it has a default state', (assert) => {
    assert.deepEqual(reducer(null, {}), defaultState, 'Returns the default state');
  });

  test('it can load in new games', (assert) => {
    const initialState = { ...defaultState };
    const withGame = { ...defaultState, games: [gameOne] };
    const withLoading = { ...defaultState, loading: true };

    const actionOne = { type: 'GAME@FIND_ALL:COMPLETE', data: [gameOne, gameTwo] };

    /* eslint max-len: 0 */
    assert.deepEqual(reducer(initialState, actionOne), { ...initialState, games: [gameOne, gameTwo] });
    assert.deepEqual(reducer(withGame, actionOne), { ...initialState, games: [gameOne, gameTwo] });
    assert.deepEqual(reducer(withLoading, actionOne), { ...initialState, loading: false, games: [gameOne, gameTwo] });
  });

  test('it can start looking for new games', (assert) => {
    const initialState = { ...defaultState };
    const withGame = { ...defaultState, games: [gameOne] };
    const actionOne = { type: 'GAME@FIND_ALL:START' };

    /* eslint max-len: 0 */
    assert.deepEqual(reducer(initialState, actionOne), { ...initialState, loading: true });
    assert.deepEqual(reducer(withGame, actionOne), { ...initialState, games: [gameOne], loading: true });
  });

  test('it can add a new game that has not been saved', (assert) => {
    const initialState = { ...defaultState };
    const withGame = { ...defaultState, games: [gameOne] };
    const actionOne = { type: 'GAME@CREATE:START' };

    /* eslint max-len: 0 */
    assert.deepEqual(reducer(initialState, actionOne), { ...initialState, loading: true });
    assert.deepEqual(reducer(withGame, actionOne), { ...initialState, games: [gameOne], loading: true });
  });

  test('it can add a new game that HAS been saved', (assert) => {
    const initialState = { ...defaultState };
    const withGame = { ...defaultState, games: [gameOne] };
    const actionOne = { type: 'GAME@CREATE:COMPLETE', data: gameTwo };

    /* eslint max-len: 0 */
    assert.deepEqual(reducer(initialState, actionOne), { ...initialState, games: [gameTwo] });
    assert.deepEqual(reducer(withGame, actionOne), { ...initialState, games: [gameTwo, gameOne] });
  });

  test('it can update a game based on the _id property', (assert) => {
    const stateOne = { ...defaultState, games: [gameOne] };
    const stateTwo = { ...defaultState, games: [{ ...gameOne, atCampus: false }] };
    const stateThree = { ...defaultState, games: [gameOne, gameTwo] };
    const actionOne = { type: 'GAME@UPDATE:TOGGLE_ATCAMPUS', id: gameOne._id };

    /* eslint max-len: 0 */
    assert.deepEqual(reducer(stateOne, actionOne), { ...defaultState,
      games: [{
        ...gameOne,
        atCampus: false,
      }] });
    assert.deepEqual(reducer(stateTwo, actionOne), { ...defaultState,
      games: [{
        ...gameOne,
        atCampus: true,
      }] });
    assert.deepEqual(reducer(stateThree, actionOne), { ...defaultState,
      games: [{ ...gameOne, atCampus: false }, gameTwo] });
  });

  test(' it can remove based on the _id property', (assert) => {
    const stateOne = { ...defaultState, games: [gameOne] };
    const stateTwo = { ...defaultState, games: [gameOne, gameTwo] };
    const actionOne = { type: 'GAME@REMOVE:COMPLETE', id: gameOne._id };

    assert.deepEqual(reducer(stateOne, actionOne), { ...defaultState, games: [] });
    assert.deepEqual(reducer(stateTwo, actionOne), { ...defaultState, games: [gameTwo] });
  });
});
