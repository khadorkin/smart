import __interface from './interface';
// import ReactDOM from 'react-dom';

const diff = (prev, next) => {
  if (next < 0) {
    return prev;
  }

  if (prev === null) {
    return next;
  }

  return next < prev ? next : prev;
};

export class Dom extends __interface {

  up(collection, item) {
    const diffY = collection.reduce((prev, current) => {
      const next = item.rect.top - current.rect.bottom;

      return diff(prev, next);
    }, null);

    const top = collection.reduce((prev, current) => {
      const nextY = item.rect.top - current.rect.bottom;

      if (nextY !== diffY) {
        return prev;
      }

      const left = Math.abs(item.rect.left - current.rect.left);
      const right = Math.abs(item.rect.right - current.rect.right);
      const next = {
        id: current.id,
        diffX: left < right ? left : right,
        diffY: diffY,
        isList: current.isList
      };

      if (prev.diffX === null) {
        return next;
      }

      return next.diffX < prev.diffX ? next : prev;
    }, {id: null, diffX: null, diffY: diffY});

    return top.id !== null ? top : null;
  }

  down(collection, item) {
    const bottomY = collection.reduce((prev, current) => {
      const next = current.rect.top - item.rect.bottom;

      return diff(prev, next);
    }, null);

    const bottom = collection.reduce((prev, current) => {
      const nextY = current.rect.top - item.rect.bottom;

      if (nextY !== bottomY) {
        return prev;
      }

      const left = Math.abs(item.rect.left - current.rect.left);
      const right = Math.abs(item.rect.right - current.rect.right);
      const next = {
        id: current.id,
        diffX: left < right ? left : right,
        diffY: bottomY,
        isList: current.isList
      };

      if (prev.diffX === null) {
        return next;
      }

      return next.diffX < prev.diffX ? next : prev;
    }, {id: null, diffX: null, diffY: bottomY});

    return bottom.id !== null ? bottom : null;
  }

  left(collection, item) {
    const diffX = collection.reduce((prev, current) => {
      const next = item.rect.left - current.rect.right;

      return diff(prev, next);
    }, null);

    const left = collection.reduce((prev, current) => {
      const nextX = item.rect.left - current.rect.right;

      if (nextX !== diffX) {
        return prev;
      }

      const top = Math.abs(item.rect.top - current.rect.top);
      const bottom = Math.abs(item.rect.bottom - current.rect.bottom);
      const next = {
        id: current.id,
        diffX: diffX,
        diffY: top < bottom ? top : bottom,
        isList: current.isList
      };

      if (prev.diffY === null) {
        return next;
      }

      return next.diffY < prev.diffY ? next : prev;
    }, {id: null, diffX: diffX, diffY: null});

    return left.id !== null ? left : null;
  }

  right(collection, item) {
    const rightX = collection.reduce((prev, current) => {
      const next = current.rect.left - item.rect.right;

      return diff(prev, next);
    }, null);

    const right = collection.reduce((prev, current) => {
      const nextX = current.rect.left - item.rect.right;

      if (nextX !== rightX || item.id === current.id) {
        return prev;
      }

      const top = Math.abs(item.rect.top - current.rect.top);
      const bottom = Math.abs(item.rect.bottom - current.rect.bottom);
      const next = {
        id: current.id,
        diffX: rightX,
        diffY: top < bottom ? top : bottom,
        isList: current.isList
      };

      if (prev.diffY === null) {
        return next;
      }

      return next.diffY < prev.diffY ? next : prev;
    }, {id: null, diffX: rightX, diffY: null});

    return right.id !== null ? right : null;
  }

}
