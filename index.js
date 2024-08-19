const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))


app.get("/",(req,res) =>{
    res.render("home.ejs");
});

app.get("/cats", (req,res) =>{
    const cats = [
    "Blue","Panda", "Mangoose", "Monty", "Rachel" 
    ]
    res.render("cats", { allCats : cats });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data){
        res.render("subreddit", {...data}); 
    } else{
        res.render("notFound", {subreddit});
    }
})

app.get("/random", (req,res) =>{
    const num = Math.floor(Math.random()*10)+1;
    res.render("random", { rand: num });
});


app.listen(3000, () =>{
    console.log("Listenin on port 3000");
});
