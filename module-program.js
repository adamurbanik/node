//6
// module.exports = function (directory, filter, callback) { 
//   var fs = require('fs');
//   var path = require('path');
//   fs.readdir(directory, function (error, list) { 
//     if (error) return callback(error);

//     var ext = filter;
//     list = list.filter(function (item) {
//       var fileExtension = path.extname(item).slice(1);
//       if (fileExtension == ext) return item;
//     });
//     callback(null, list);
//   })
// }
