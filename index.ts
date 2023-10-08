import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';

const publicPath = path.join(__dirname, 'public');
const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  let { method, url } = request;
  console.log(method, url);
  const object = new URL(url || '', 'http://localhost');
  let { pathname, search } = object;
  console.log(search);
  if (method === 'GET') {
    let fileName = pathname.slice(1);
    if(fileName===''){
      fileName='index.html' //默认返回index.html
    }
    console.log('fileName--', fileName);
    fs.readFile(path.join(publicPath, fileName), (err, data) => {
      if (err) {
        console.log(err)
        if (err.errno === -2) {
          response.statusCode = 404;
          response.setHeader('Content-Type', 'text/html;charset=utf-8');
          // 当找不到页面的时候，返回一个404页面
          fs.readFile(path.join(publicPath, '404.html'),(err,data)=>{
            if(err){
              response.end('您请求的内容不存在呀，请再确认下~');
            }else{
              response.end(data)
            }
          })
        } else {
          response.statusCode = 500;
          response.setHeader('Content-Type', 'text/plain;charset=utf-8');
          response.end('服务器繁忙，请稍后再试~');
        }
      }else{
        // response.setHeader('Content-type', 'text/html;charset:utf-8');
        response.end(data);    
      }
    });

  }
});

server.listen(8888);
