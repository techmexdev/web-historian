// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers.js');
var httpHelp = require('../web/http-helpers.js');
var htmlFetcher = function(url, callback) {
  archive.isUrlArchived(url, function(bool){
    if (bool) {
      httpHelp.serveAssets();
    } else {
      //state pending status
      // add to url list
      //download
    }
  });
  //do stuff
};