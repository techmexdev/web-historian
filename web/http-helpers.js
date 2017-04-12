var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.
  var fileName = path.join(__dirname, 'public/index.html');
  var site = path.join(archive.paths.archivedSites, asset);
  var content;
  // console.log("ASSRT: *******************", asset);
  if (asset === '/') {
    content = fileName;
    // console.log('CONTENT ===================',content);
  } else {
    content = site;
  }

  fs.readFile(content, function (err, data) {
    if (err) {
      throw err;
    }
    callback(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
