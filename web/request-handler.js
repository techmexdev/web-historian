var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var nurl;
  if (req.method === 'GET') {
    if (req.url.length > 1) {
      nurl = req.url.slice(1);
      archive.isUrlArchived(nurl, (bool) => {
        if (bool) {
          httpHelper.serveAssets(res, nurl, (data) => {
            res.writeHeader(200, httpHelper.headers);  
            res.write(data);
            res.end('Good Day m8!');
          });
        } else {
          res.writeHeader(404, httpHelper.headers);
          res.end('sorry m8');
        }
      });
    } else {
      nurl = req.url;
      httpHelper.serveAssets(res, nurl, (data) => {
        res.writeHeader(200, httpHelper.headers);  
        res.write(data);
        res.end('Good Day m8!');
      });
    }
  } else if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      nurl = body.split('=')[1];
      archive.addUrlToList(nurl, () => {
        res.writeHeader(302, httpHelper.headers);
        res.end('received and posted');
      });
    });
  }
};