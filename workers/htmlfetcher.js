// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var CronJob = require('cron').CronJob;
var archive = require('../helpers/archive-helpers.js');
var httpHelp = require('../web/http-helpers.js');

var htmlFetcher = function() {
  archive.readListOfUrls(function(sites) {
    var list = sites;
    if (list.length > 0) {
      archive.downloadUrls(list);
    }
  });
};
new CronJob('* 1 * * * *', function() {
  htmlFetcher();
}, null, true, 'America/Los_Angeles');