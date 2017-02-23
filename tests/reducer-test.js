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
});
