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
    const anime = animesArr.find((anime) => anime.id === Number(id));
    res.status(200).json(anime);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// create one anime
// http method is POST
// path is /animes

animes.post("/", (req, res) => {
  try {
    const anime = req.body;
    animesArr.push(anime);
    if (anime) {
      res.status(201).json(animesArr[animesArr.length - 1]);
    } else {
      throw "could not create";
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
    const { id } = req.params;
    const anime = req.body;
    const index = animesArr.findIndex((anime) => anime.id === Number(id));
    if (index !== -1) {
      animesArr.splice(index, 1, anime);
      res.status(201).json(animesArr[index]);
    } else {
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
    const { id } = req.params;
    const index = animesArr.findIndex((anime) => anime.id === Number(id));
    if (index !== -1) {
      animesArr.splice(index, 1);
      res.status(200).json(animesArr);
    } else {
      throw "could not find animes";
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

module.exports = animes;
