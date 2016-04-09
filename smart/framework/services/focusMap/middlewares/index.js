import { FOCUSED_CHANGED } from '../actions/types';

export default function focusMapMiddleware(store) {
  return next => action => {
    if (action.type !== FOCUSED_CHANGED) {
      return next(action);
    }

    const { focused } = store.getState().focusMap;

    if (!action.payload[1] || focused.listId !== action.payload[1]) {
      return false;
    }

    return next(action);
  };
}
