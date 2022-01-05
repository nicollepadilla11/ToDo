const express = require('express');

const bodyparser = require('body-parser');

const ejs = require('ejs');

const app = express();


var items = [];
let workItems =[];

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:true}));
//para decirle a express que levante este public folder como un recurso estatico
app.use(express.static("public"));

app.get("/", function(req, res) {

  var today = new Date();

  var options= {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US",options);
  //renderizar mi list.ejs page
   res.render("list",{listTitle: day, newListItem:items});

});

//agregando otra ruta
app.get("/work", function(req,res){
  //renderizar mi list.ejs page,le pasamos nuestro listTitle que sera igual a "work List", le pasamos nuestro newListItem tamnien
  res.render("list",{listTitle: "Work List", newListItem:workItems});
});

app.post("/work", function(req,res){
  // aqui creamos un item que capture mi req.body.newListItem
  let item = req.body.newItem;
  workItems.push(item);
//para que se vaya al get de aqui arribita
  res.redirect("/work");
})



//aqui capturamos la informacion despues de presionar el botin
app.post("/", function(req,res){
  var item = req.body.newItem

  if(req.body.list==="Work"){
    workItems.push(item);
    res.redirect("/work")
  } else{
    items.push(item);
    res.redirect("/")

  }

  //console.log(req.body); PRUEBA2

  //console.log("post request recived") PRUEBA1


})




app.listen(3000, function() {
  console.log("server running port 3000")
})
