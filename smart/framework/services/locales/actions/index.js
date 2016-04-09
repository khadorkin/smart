import * as langs from './types';

/** The property 'type' cannot be changed. It is needed for redux.despatch method. */
export function changeLanguage(lang) {
  return { type: langs[lang] };
}
