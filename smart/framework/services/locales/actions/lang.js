import { createAction } from 'services/helpers/utils';
import { CHANGE_LANG } from './types';

export const changeLanguage = createAction(CHANGE_LANG);
