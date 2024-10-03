export const initialState = {
  randomWord: '',
  rights: new Set(),
  wrongs: new Set(),
  mistakes: 0,
  gameOver: false,
  won: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, randomWord: action.payload };
    case 'ADD_RIGHT':
      return { ...state, rights: new Set(state.rights).add(action.payload) };
    case 'ADD_WRONG':
      return {
        ...state,
        wrongs: new Set(state.wrongs).add(action.payload),
        mistakes: state.mistakes + 1,
      };
    case 'GAME_OVER':
      return { ...state, gameOver: true };
    case 'WON':
      return { ...state, won: true };
    default:
      return state;
  }
};
