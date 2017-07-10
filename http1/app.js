var server=require("./server.js");

var app=server();
//启动服务器成功  1. 访问
app.listen(8888,function(){
    console.log("success")
});

app.get("/",function(req,res){
    res.end("index");
})
app.get("/list/",function(req,res){
    res.end("list");
})


app.get("/list/:aa/",function(req,res){
   res.sendFile("123.html");
})
app.get("/show/:aa",function(req,res){
    res.end(req.aa);
})




