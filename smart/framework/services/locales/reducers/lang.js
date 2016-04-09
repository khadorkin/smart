import objectAssign from 'object-assign';

const initialState = {
  lang: 'en'
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function changeLanguage(state = initialState, action = {}) {
  /** The property 'type' of "action" cannot be changed. It is needed for redux.despatch method. */
  switch (action.type) {
    case 'EN': {
      return objectAssign({}, state, {lang: 'en'});
    }
    case 'RU': {
      return objectAssign({}, state, {lang: 'ru'});
    }
    default:
      return state;
  }
}
