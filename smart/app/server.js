var path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config.js');
var fs = require('fs');
var root = path.resolve(__dirname, '../');

var compiler = webpack(config);

function onListen(port) {
  return function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser', port, port);
    }
  }
}


var app = express();

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use('/', function(req, res) {
  res.sendFile(root + '/app/index.html');
});

app.listen(3000, onListen(3000));

/**
 * rest api server
 */

function readJSONFile(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      throw err;
    }

    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

function writeJSONFile(filename, data, callback) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), function(err) {
    if (err) {
      throw err;
    }

    try {
      callback(data);
    } catch (exception) {
      callback(exception);
    }
  });
}


function onReadJSONFile(req, res, handler) {
  return function(err, data) {
    if (err) {
      throw err;
    }

    res.json(handler(req, data));
  }
}

var createGUID = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}());

function findElementById(list, id) {
  return list.filter(function(item) {
    return item.id === id;
  })[0];
}

function findIndexById(list, id) {
  for(var i = 0, length = list.length; i < length; i+=1) {
    if(list[i].id === id) {
      return i;
    }
  }
}

var rest = express(),
    fileName = root + '/framework/assets/fixture/users.json';

rest.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Accept', 'application/json');
  res.header('Content-Type', 'application/json');
  next();
});

rest.use(bodyParser.json());

rest.get('/users', function(req, res) {
  readJSONFile(fileName, onReadJSONFile(req, res, function(req, data) {
    return data;
  }));
});

rest.get('/users/:id', function(req, res) {
  readJSONFile(fileName, onReadJSONFile(req, res, function(req, data) {
    return findElementById(data, req.params.id);
  }));
});

rest.post('/users/create', function(req, res) {
  readJSONFile(fileName, onReadJSONFile(req, res, function(req, data) {
    var item = req.body.entity;

    item.id = createGUID();
    data.push(item);

    writeJSONFile(fileName, data, function() {});

    return item;
  }));
});

rest.put('/users/:id', function(req, res) {
  readJSONFile(fileName, onReadJSONFile(req, res, function(req, data) {
    var item = req.body.entity;

    data.splice(findIndexById(data, req.params.id), 1, item);

    // writeJSONFile(fileName, data, function() {});

    return item;
  }));
});

rest.delete('/users/:id', function(req, res) {
  readJSONFile(fileName, onReadJSONFile(req, res, function(req, data) {
    data.splice(findIndexById(data, req.params.id), 1);

    writeJSONFile(fileName, data, function() {});

    return {};
  }));
});

rest.listen(3030, onListen(3030));
