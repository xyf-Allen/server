var http=require("http");
var path=require("path");
var fs=require("fs");
class server {
    constructor (){
        this.paths={};
        this.flag=true;
        this.tpl="template";
    }
    listen(port,info){
        var that=this;
        http.createServer(function(req,res){
            that.done(req,res);
        }).listen(port,function(){
            if(info){
              info();
            }
        })
    }
    get(url,callback){
        this.paths[url]=callback;

    }
    done(req,res){
        var that=this;
        var url=req.url;
        if(url=="/favicon.ico"){
            res.end()
        }else {

            res.render=function(file){
                var tplpath=path.join(that.tpl,file);
                fs.createReadStream(tplpath).pipe(res);

            }
            this.flag=true;
            for (var i in this.paths) {
                if (i == url) {
                    this.flag = false;
                    this.paths[i](req, res);
                }
            }

            if (this.flag) {
                res.setHeader("content-type", "text/html;charset=utf-8");
                res.end("迷路了");
            }
        }
    }

}

module.exports=new server();
