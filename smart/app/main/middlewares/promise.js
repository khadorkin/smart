export default function promiseMiddleware() {
  return next => action => {
    const { promise, type, ...rest } = action; // eslint-disable-line no-redeclare

    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = type;
    next({...rest, type: REQUEST});

    promise
      .then((response) => response.json())
      .then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

    return promise;
  };
}
