var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // get sites.txt
  // while reading separate by new line
  // populate array
  // perform callback on array
  var sites;
  var str = '';
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      throw err;
    }
    str += data;
    sites = str.split('\n');
    callback(sites);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(sites) {
    if (sites.indexOf(url) !== -1) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function (err) {
    if (err) {
      console.log(err);
      throw err;
    }
    callback();
    console.log('Saved!');
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    console.log('FILES================', files);
    if (files.indexOf(url) >= 0){
      callback(true);
    } else {
      callback(false);
    }
  });
};
//download gets urls and data from fetcher
// then makes a file of url name and data is html
exports.downloadUrls = function(urls, data) {
  urls.forEach(function(url) {
    fs.writeFile(`${exports.paths.archivedSites}/${url}`, data, function(err) {
      if (err) {
        throw err;
      }
    });
  });
  fs.writeFile(exports.paths.list, '', function(err) {
    if (err) {
      throw err;
    }
  });
};













