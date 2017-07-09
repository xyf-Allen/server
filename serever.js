var http=require("http");
var path=require("path");
/*
*    服务器： xxx/  1.html   js运行  回调地狱
*
*    客户端： 1.html  浏览器的缓存  1000*100 100
* */
var config=require("./config.json");
var fs=require("fs");
http.createServer(function(req,res){
    if(req.url=="/favicon.ico"){
        res.end();
    }else{
        //"得到用户的请求的信息"

        var root=config.root;

        fs.stat("./"+root,function(error){
           if(error){
               res.setHeader("content-type","text/html;charset=utf-8");
               res.writeHead(404);
               res.end("根目录不存在");
           }else{
               var requestUrl="."+req.url;
               var fullpath=path.resolve(root,requestUrl);
               var ext=path.extname(fullpath);
               if(!ext){
                   var index=config.index;
                   fullpath=path.resolve(fullpath,index);
               }

               ext=path.extname(fullpath);

               fs.stat(fullpath,function(error){
                    if(error){
                        res.setHeader("content-type","text/html;charset=utf-8");
                        res.end("文件找不到");
                    }else{
                        //请求的文件存在

                        var info=fs.statSync(fullpath);
                        var mtime=info.mtime.toUTCString();

                        var reqtime=req.headers["if-modified-since"];

                        if(reqtime&&reqtime==mtime){
                            res.writeHead(304)
                            res.end();
                        }else {


                            var type = config.type[ext];

                            fs.readFile(fullpath, function (error, data) {
                                res.setHeader("content-type", type + ";charset=utf-8");

                                res.setHeader("cache-control", "max-age=" + 1000 * 10);
                                res.setHeader("last-modified", mtime);


                                res.end(data);
                            })


                        }

                    }
               })

           }
        })

    }

}).listen(8888);






