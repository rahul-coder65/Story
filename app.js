const express = require("express");

const bodyParser = require("body-parser");
let items = ["Buy Food", "Cook Food", "Eat Food"];

let workItems = [];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true }));

app.use(express.static("public"));

app.get("/", function(req,res){
    let today = new Date();
    let options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };
    let day = today.toLocaleDateString("en-US", options);
 /*   switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
    
        default:
            break;
    }
    */
    res.render("list", { listTitle : day , newListItems : items});
});


app.post("/" ,function(req,res){
    let item = req.body.newItem;
if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
    
}
else{
    items.push(item);
    res.redirect("/");
}
});

app.get("/work", function(req,res){
    res.render("list", {listTitle : "Work List", newListItems : workItems});
});

app.get("/about" ,function(req,res){
    res.render("about");
});





app.listen(3030,function(){
    console.log("Server is running on port 3030.");
});

