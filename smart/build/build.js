(function() {

  var path = require('path'),
      fs = require('fs'),
      root = path.resolve(__dirname, '../'),
      webpack = require('webpack'),
      config = require(root + '/webpack.config.js'),
      compiler = webpack(config),
      entryFile = root + '/dist/index.html';

  compiler.run(function(err, stats) {
    fs.writeFileSync(entryFile);
    fs.createReadStream(root + '/app/index.html').pipe(fs.createWriteStream(entryFile));
  });

}());
