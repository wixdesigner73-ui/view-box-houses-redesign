const http=require("http"),fs=require("fs"),path=require("path");
const root=process.argv[2],port=+process.argv[3]||5173;
const types={".html":"text/html",".js":"text/javascript",".css":"text/css",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"};
http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split("?")[0]);if(u.endsWith("/"))u+="index.html";const f=path.join(root,u);
 fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end("404");}r.writeHead(200,{"content-type":types[path.extname(f)]||"application/octet-stream"});r.end(d);});}).listen(port,()=>console.log("up",port));
