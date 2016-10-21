//6
module.exports.filterFiles = function (directory, filter, callback) {
  var fs = require('fs');
  var path = require('path');
  fs.readdir(directory, function (error, list) {
    if (error) return callback(error);

    var ext = filter;
    list = list.filter(function (item) {
      var fileExtension = path.extname(item).slice(1);
      if (fileExtension == ext) return item;
    });
    callback(null, list);
  })
}


function Logger(name) {
  this.count = 0;
  this.name = name;
};
Logger.prototype.log = function (message) {
  this.count++;
  console.log('[' + this.name + '] ' + message);
};
module.exports.logger = new Logger('DEFAULT');