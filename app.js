const express = require('express');

const bodyparser = require('body-parser');

const ejs = require('ejs');

const app = express();


var items = [];

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
   res.render("list",{kindOfDay: day, newListItem:items, lengths: items.length});

});

//aqui capturamos la informacion despues de presionar el botin
app.post("/", function(req,res){
  var item = req.body.newItem
  items.push(item)

  res.redirect("/");

  console.log(items);
  //console.log("post request recived")


})




app.listen(3000, function() {
  console.log("server running port 3000")
})
