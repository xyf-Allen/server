
var server=require("./server.js");
var mysql=require("mysql");
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

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'w1701blog'
    });

    connection.query('select * from member', function (error, results, fields) {
        res.render("1.html",{results:results})
    });

})
app.get("/show/:id",function(req,res){
    res.end(req.id);
})




