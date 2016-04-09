import Observer from 'services/helpers/Observer';

let _instance;

/**
 * Singleton pattern
 */
export default class Dispatcher extends Observer {

  static getInstance() {
    if (!!_instance) {
      return _instance;
    }

    _instance = new Dispatcher();

    return _instance;
  }

  setKeyMap(config) {
    this._eventsMap = config;
  }

  getKeyMap() {
    return this._eventsMap;
  }

}
