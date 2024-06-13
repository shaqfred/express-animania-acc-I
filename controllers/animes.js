const express = require("express");
const animes = express.Router();
const animesArr = require("../data/animes");

// Read All - Index http verb: GET, CRUD: Read - get a list of all animes

animes.get("/", (_, res) => {
  // "/animes/" and is a get request
  try {
    res.status(200).json(animesArr);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// get ONE Anime
// http method - get
// we need the id of the specific anime we are trying to get
// path : "/animes/:id"
animes.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    // since req.params is an object we can destructure the param we are in need of
    const anime = animesArr.find((anime) => anime.id === Number(id)); // if find does not find an element that meets the conditional it returns undefined
    if (anime) {
      // if anime is truthy (it is not undefined)
      res.status(200).json(anime);
    } else {
      throw "could not find anime"; // if the anime is not found we forced an error to land in the catch and respond with the error
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// create one anime
// http method is POST
// path is /animes

animes.post("/", (req, res) => {
  try {
    const anime = req.body; // store the new anime data in the anime variable

    if (anime.id) {
      // if data exist add to animes arr and send back successful response
      animesArr.push(anime);
      res.status(201).json(animesArr[animesArr.length - 1]);
    } else { // otherwise trigger an error message 
      throw "could not create. please provide data";
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// update an anime
// http method PUT
// path is /animes/:id

animes.put("/:id", (req, res) => {
  try {
    const { id } = req.params; // desctructure the id of the anime we are updating
    const anime = req.body; // req.body provides the anime data with updates
    const index = animesArr.findIndex((anime) => anime.id === Number(id)); // we are using the id to find the anime we are replacing. If findIndex() does not find the anime it returns -1, otherwise it returns the index
    if (index !== -1) { // if it found the index
      animesArr.splice(index, 1, anime); // replace the anime with the updated anime object
      res.status(201).json(animesArr[index]); // sending back a successful response
    } else { // otherwise we trigger an error 
      throw "could not update anime"; // triggering the error
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// delete one anime
// http method is delete
// path = /animes/:id

animes.delete("/:id", (req, res) => {
  try {
    const { id } = req.params; // destructuring the id of the anime we're deleting 
    const index = animesArr.findIndex((anime) => anime.id === Number(id)); // we are finding that anime using the id. If it is not found findIndex() returns -1
    if (index !== -1) { // if the index is found 
      animesArr.splice(index, 1); // we will delete the anime
      res.status(200).json(animesArr); // sending a successful response and our updated array 
    } else { // otherwise we trigger an error 
      throw "could not find animes";
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

module.exports = animes;
