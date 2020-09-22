const readPost = require('../scripts/readPost');

module.exports = function (source) {
  return new Promise((resolve) => {
    // let loadableState = `withLoadable(() => import($PATH))`;
    const loadableStatement = 'loadable({ loader: () => import(\'$PATH\'), loading: Loading})';
    readPost().then((routes) => {
      source = source.replace('// injectRouteHere', `
      routes: ${JSON.stringify(routes, (key, value) => {
    if (key === 'component') {
      return loadableStatement.replace('$PATH', `${value}`);
    }
    return value;
  }, 2)}
      `);
      // "withLoadable
      source = source.replace(/"loadable/g, 'loadable').replace(/\}\)"/g, '})');
      resolve(source);
    })
      .catch((err) => {
        console.log(err);
      });
  });
};
