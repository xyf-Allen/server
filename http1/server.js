var http=require("http");
var path=require("path");
var fs=require("fs");

/*如何创建一个动态的服务器
*
* */
class server {
   constructor(){
        this.getArr={};
        this.staticType=".jpg|.png|.css|.js|.gif|.html";
        this.mimeType={
            ".jpg":"image/jpeg",
            ".png":"image/png",
            ".gif":"image/gif",
            ".css":"text/css",
            ".html":"text/html",
            ".js":"application/x-javascript"
        }

        this.staticDir="static"
   }

   listen(port,callback){
       var that=this;
        var obj=http.createServer(function(req,res){
            that.done(req,res);
        });
        obj.listen(port,function(){
            if(callback){
                callback();
            }
        })
   }


   get(url,callback) {
       var attr = url.match(/:[^\/]+/g)||[];
       attr = attr.map(function (a, b) {
           return a.substr(1);
       })

       var reg = url.replace(/:[^\/]+/g, "([^\/]+)");
       reg="/^"+reg.replace(/\//g,"\\/")+"$/";

       this.getArr[reg]={};
       this.getArr[reg].attr=attr;
       this.getArr[reg].fn=callback;
   }

   done(req,res){
       var that=this;
       var url=req.url;
       if(url=="/favicon.ico"){
           res.end();
       }else {
           var urlinfo=path.parse(url);
           //1.  如果说在访问静态文件
           if(this.staticType.indexOf(urlinfo.ext)>-1&&urlinfo.ext){
              var staticUrl=path.join(this.staticDir,urlinfo.dir,urlinfo.base);

              fs.readFile(staticUrl,function(error,data){
                 if(error){
                     console.log("这个静态文件不存在");
                     res.end();
                 }else{
                        res.setHeader("content-type",that.mimeType[urlinfo.ext]+";charset=utf-8");
                        res.end(data);
                 }
              })
           }else{
               var fullpath=req.url;
               that.flag=true;
               for(var i in that.getArr){

                  if(eval(i).test(fullpath)){
                      that.flag=false;
                     var result=eval(i).exec(fullpath);
                     for(var j=0;j<that.getArr[i].attr.length;j++){
                         req[that.getArr[i].attr[j]]=result[j+1];

                     }

                     that.getArr[i].fn(req,res);


                  }
               }

               if(that.flag){
                   res.setHeader("content-type","text/html;charset=utf-8");
                   res.end("迷路了");
               }

           }


       }
   }

}

module.exports=function(){
   return new server();
}

