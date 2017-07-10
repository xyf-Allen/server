var server=require("./server.js");

var app=server();

app.listen(8888,function(){
    console.log("success")
});





app.get("/",function(req,res){
    res.end("index");
})
app.get("/list/",function(req,res){
    res.end("list");
})
app.get("/list/:aa",function(req,res){
    res.end(req.aa);
})
app.get("/show/:id",function(req,res){
    res.end(req.id);
})




