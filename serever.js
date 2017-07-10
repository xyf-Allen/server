#!/usr/bin/env  node
//angular
//1. nodejs   没有给我们提供服务器，就没有给我们指定访问的规则

// 自己去指定访问规则 , 根据用户的需求，可以指定相应的访问规则

//  我可以指定自己的规则，让用户去遵守
var http=require("http");
var path=require("path");
const zlib = require('zlib');
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


                            console.log(req.headers["cookie"]);
                            var type = config.type[ext];


                                res.setHeader("content-type", type + ";charset=utf-8");

                                res.setHeader("cache-control", "max-age=10000" );
                                res.setHeader("last-modified", mtime);


                                res.setHeader("Content-Encoding","gzip");

                                res.setHeader("set-cookie","name=zhangsan");

                                var read=fs.createReadStream(fullpath);


                                read.pipe(zlib.createGzip()).pipe(res);


                        }

                    }
               })

           }
        })

    }

}).listen(8888,function(){
    console.log("服务器启动")
});






