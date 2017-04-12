var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var nurl = req.url;
  // if(req.url.length > 1){

  //   nurl = req.url.slice(1);
  //   archive.isUrlArchived(nurl, (bool) => {
  //     if (bool) {
  //       httpHelper.serveAssets(res, nurl, (data) => {
  //         res.writeHeader(200, httpHelper.headers);  
  //         res.write(data);
  //         res.end('Good Day m8!');
  //       });
  //     } else {
  //       res.writeHeader(404, httpHelper.headers);
  //       res.end('sorry m8');
  //     }
  //   });
  // } else {
  //   nurl = req.url;
  //   httpHelper.serveAssets(res, nurl, (data) => {
  //     res.writeHeader(200, httpHelper.headers);  
  //     res.write(data);
  //     res.end('Good Day m8!');
  //   });
  // }
  if(req.method === 'GET') {
    if(req.url.length > 1){

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
  }
  if (req.method === 'POST') {
    archive.addUrlToList(nurl, () => {
      res.writeHeader(302, httpHelper.headers);
      res.end('sorry m8');
    });
  }

  //if in archive serve assets
  //if not found set headers 404
  
};


///==================================================================
// exports.serveAssets = function(res, asset, callback) {
// var fileName = path.join(__dirname, 'public/index.html');
//   fs.readFile(fileName, function (err, data) {
//     if (err) {
//       throw err;
//     }
//     res.writeHeader(200, {'Content-Type': 'text/html'});  
//     res.write(data);
//     res.end('Good Day m8!');
//     return;
//   });