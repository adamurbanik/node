// "use strict";

// const http = require("http");

// const paths = {
//   "deleteItem" : {
//     path: /^\/[0-9]+$/im,
//     method: "DELETE"
//   }
// }

// const server = http
//   .createServer()
//   .listen(8080, () => console.log("listening 8080"))
//   .on("request", (req, res) => { console.log(req.url);
//     if (paths.deleteItem.path.test(req.url) && paths.deleteItem.method === req.method) {
//       res.write("Dupa");
//       res.write("Kupa");
//       res.write("Rower");
//       res.end();
//     }
//   });

// setTimeout(() => {
//   http.request({
//     port: 8080,
//     method: "DELETE",
//     host: "127.0.0.1",
//     headers: {},
//     path: "/200",
//   }, res => res
//     .on("data", data => console.log(data.toString()))
//     .on("end", () => console.log("Request ended")))
//   .end()
// }, 1000);



// var myModule = require('./module-program.js');
// myModule.filterFiles(process.argv[2], process.argv[3], (error, list) => { 
//   console.log(process.argv[2], process.argv[3]);
//   if (error) console.log('prints error');
//   list.forEach((item) => console.log(item));
// });

// myModule.logger.log('nie wiem co powiedziec');


