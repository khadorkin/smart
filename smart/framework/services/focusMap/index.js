import Observer from 'services/helpers/Observer';

class FocusMap extends Observer {

  constructor() {
    super();
  }

  set active(component) {
    this._active = component;
  }

  getActive() {
    return this._active;
  }

}

export default FocusMap;
