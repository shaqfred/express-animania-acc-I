const express = require("express");// Dependency // requiring express from our node modules
const app = express(); // configuration // storing an instance of express in our app variable 
const animesController = require("./controllers/animes")


app.use(express.json()) // parse incoming json - when we make an http request we receive a json string and we parse it into a json object. We need to place our json parser before our routes 

app.use("/animes", animesController); // binding our path to the routes found in our controller file 


app.get("/", (_, response)=>{ // route for our "homepage"
    response.send("Welcome to Animania")
})

module.exports = app;