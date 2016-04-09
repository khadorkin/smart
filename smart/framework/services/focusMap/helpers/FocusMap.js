// import ReactDOM from 'react-dom';
import * as strategies from './strategies';

const strategy = new strategies.Dom();

export class NodeModel {

  constructor(node) {
    this.id = node.dataset.fmId;
    this.isList = !!node.dataset.fmList;
    this.rect = node.getBoundingClientRect();
  }

}

export class Dom {

  static getContainer(id, parentId = null) {
    return document.querySelector(`[data-fm-list][data-fm-id='${id}']` + (parentId ? `[data-fm-parent-id='${parentId}']` : ''));
  }

  static getItems(container = document, parentId) {
    return container.querySelectorAll('[data-fm-id]' + (parentId ? `[data-fm-parent-id='${parentId}']` : ''));
  }

  static getItem(id, container = document, parentId) {
    return container.querySelector(`[data-fm-id='${id}']` + (parentId ? `[data-fm-parent-id='${parentId}']` : ''));
  }

  static mapNodeCollection(nodeList = []) {
    const collection = [];

    for (const node of nodeList) {
      collection.push(new NodeModel(node));
    }

    return collection;
  }

  static findInParent() {
    return null;
  }

  static findInList(direction, focused, instance, instances) {
    const container = Dom.getContainer(instance.listId);
    const collection = Dom.mapNodeCollection(Dom.getItems(container, instance.listId));

    const currentContainer = Dom.getContainer(focused.listId);
    const current = new NodeModel(Dom.getItem(focused.itemId, currentContainer));

    const next = strategy[direction](collection, current);

    let response;

    if (next) {
      if (next.isList) {
        response = Dom.findInList(direction, focused, instances[next.id], instances);
      } else {
        response = Object.assign({}, instance, {itemId: next.id});
      }
    } else if (instance.parentId) {
      response = Dom.findInList(direction, focused, instances[instance.parentId], instances);
    }

    return response;
  }

}

class FocusMap {

  static storage = []

  static focused = null

  static setItem({ listId, parentId = null, itemId = null }) {
    const index = FocusMap.storage.indexOf(this.getItem(listId));
    const entity = {
      listId,
      parentId,
      itemId
    };

    if (index) {
      FocusMap.storage.splice(index, 1, entity);
    } else {
      FocusMap.storage.push(entity);
    }
  }

  static getItem(listId) {
    return FocusMap.storage.find((item) => item.listId === listId);
  }

}

export default FocusMap;
