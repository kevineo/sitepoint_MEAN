var fs = require('fs');

exports.send404 = function(response) {
  console.error("Page not found");

  response.writeHead(404, {
    'Content:Type': 'text/plain'
  });
  response.end('Not found');
}

exports.sendJson = function (data, response) {
  response.writeHead(200, {
    'Content-Type' : 'application/json'
  });
  response.end(JSON.stringify(data));
}

exports.send500 = function(data, response) {
  console.error(data);

  response.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  response.end(data);
}

exports.staticFile = function(staticPath) {
  return function(data, response) {
    var readStream;

    //fix routes to /home & /home.html
    data = data.replace(/public^(\/home)(.html)?$/i,'$1.html');
    data = '.' + staticPath + data;

    fs.stat(data, function (error, stats) {
      if (error || stats.isDirectory()) {
        return exports.send404(response);
      }

      readStream = fs.createReadStream(data);
      return readStream.pipe(response);
    });
  }
}

