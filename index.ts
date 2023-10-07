import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';

const publicPath = path.join(__dirname, 'public');
const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  let { method, url } = request;
  console.log(method, url);
  if (method === 'GET') {
    switch (url) {
      case '/index.html':
        fs.readFile(path.join(publicPath, 'index.html'), (err, data) => {
          if (err) throw err;
          response.setHeader('Content-type', 'text/html;charset:utf-8');
          response.write(data.toString());
          response.end();
        });
        break;
      case '/style.css':
        fs.readFile(path.join(publicPath, 'style.css'), (err, data) => {
          if (err) throw err;
          response.setHeader('Content-type', 'text/css;charset:utf-8');
          response.write(data.toString());
          response.end();
        });
        break;
      case '/main.js':
        fs.readFile(path.join(publicPath, 'main.js'), (err, data) => {
          if (err) throw err;
          response.setHeader('Content-type', 'text/javascript;charset:utf-8');
          response.write(data.toString());
          response.end();
        });
        break;
    }
  }
});

server.listen(8888);
