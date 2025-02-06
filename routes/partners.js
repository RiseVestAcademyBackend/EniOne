var express = require('express');
var router = express.Router();
var data = require("../data/spouses.json")


// gets all the persons
router.get("/persons", (req, res, next) => {
  res.status(200).json(data["persons"]);
})

// adds a new person
router.post("/persons", (req, res, next) => {
  data["persons"].push(req.body)
  res.status(201).json();
})

// updates all the persons
router.put("/persons", (req, res, next) => {
  data["persons"] = req.body;

  res.status(200).json(req.body);
})

// delete the entire table
router.delete("/persons", (req, res, next) => {
  data["persons"] = []
  res.status(200).json([]);
})

// get a particular person
router.get("/persons/:personId", (req, res, next) => {
  const personId = req.params.personId
  res.status(200).json(data["persons"].find((e) => e.id == personId));
})

router.put("/persons/:personId", (req, res, next) => {
  let id = req.params.personId;
  let ind = data["persons"].findIndex((x) => x.id == id);
  if (ind) data["persons"][ind] = id;
  res.status(200).json([]);
})
router.delete("/persons/:personId", (req, res, next) => {
  let id = req.params.personId;
  let ind = data["persons"].findIndex((x) => x.id == id);
  if (ind) data["persons"].splice(ind, 1);
  res.status(200).json([]);
})

router.get("/persons/:personId/partners", (req, res, next) => {
  res.status(200).json(data["partners"].filter(x => x.personId == req.params.personId));
})

router.delete("/persons/:personId/partners", (req, res, next) => {
  let personId = req.params.personId;

  data["partners"] = data["partners"].filter(x => x.personId != personId)
  res.status(200).json([]);
})
router.post("/persons/:personId/partners", (req, res, next) => {

  data["partners"].push(req.body)
  res.status(201).json(req.body);

})
router.put("/persons/:personId/partners", (req, res, next) => {
  data["partners"].push(req.body);

  res.status(201).json(req.body);
})

router.get("/persons/:personId/partners/:partnerId", (req, res, next) => {
  res.status(200).json(data["partners"].find(x => x.id == req.params.partnerId));
})

router.put("/persons/:personId/partners/:partnerId", (req, res, next) => {
  data["partners"].find(x => x.id == req.params.partnerId) = req.body;

  res.status(201).json(req.body);
})

router.delete("/persons/:personId/partners/:partnerId", (req, res, next) => {
  data["partners"].splice(data["partners"].findIndex(x => x.id == req.params.partnerId), 1)
  res.status(200).json([]);
})

module.exports = router;
