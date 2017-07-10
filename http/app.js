var server=require("./server");

server.listen(8888,function(){
    console.log("success");
});


server.get("/",function(req,res){
 
   res.render("index.html");
})

server.get("/list",function(req,res){
    res.render("list.html");
})

server.get("/show",function(req,res){
    res.render("show.html");
})