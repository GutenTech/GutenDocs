var fs = require('fs');

/* If it doesn't Exist, Generate a gutenDocs folder */

const dir = './gutenDocs';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}


// const genIndexFile = function (data) {
//   data = "some data here";
//   fileContent = ""

//   var stream = fs.createWriteStream("index.html");
//   stream.once('open', function(fd) {
//     stream.write("<!DOCTYPE html> \n <html lang='en'\n>");
//     stream.write(`My second row ${data}`);
//     stream.end();
//   });

//   fs.writeFile()
// }

// genComponent();


// const genComponent = function (data) {
//   var stream = fs.createWriteStream("my_file.js");
//   stream.once('open', function(fd) {
//     stream.write("//plainText32");
//     stream.write("My second row\n");
//     stream.end();
//   });
// }

