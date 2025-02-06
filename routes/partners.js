var express = require('express');
var data = require("../data/spouses.json")
var router = express.Router();

// Get all persons
router.get("/persons", (req, res) => {
  res.status(200).json(data["persons"]);
});

// Add a new person
router.post("/persons", (req, res) => {
  data["persons"].push(req.body);
  res.status(201).json(req.body);
});

// Update all persons
router.put("/persons", (req, res) => {
  data["persons"] = req.body;
  res.status(200).json(req.body);
});

// Delete all persons
router.delete("/persons", (req, res) => {
  data["persons"] = [];
  res.status(200).json({ message: "All persons deleted" });
});

// Get a specific person
router.get("/persons/:personId", (req, res) => {
  const personId = parseInt(req.params.personId);
  const person = data["persons"].find(e => e.id === personId);
  res.status(200).json(person || { error: "Person not found" });
});

// Update a specific person
router.put("/persons/:personId", (req, res) => {
  const personId = parseInt(req.params.personId);
  const ind = data["persons"].findIndex(x => x.id === personId);
  if (ind !== -1) {
    data["persons"][ind] = { ...data["persons"][ind], ...req.body };
    return res.status(200).json(data["persons"][ind]);
  }
  res.status(404).json({ error: "Person not found" });
});

// Delete a specific person
router.delete("/persons/:personId", (req, res) => {
  const personId = parseInt(req.params.personId);
  const ind = data["persons"].findIndex(x => x.id === personId);
  if (ind !== -1) {
    data["persons"].splice(ind, 1);
    return res.status(200).json({ message: "Person deleted" });
  }
  res.status(404).json({ error: "Person not found" });
});

// Get a person's partners
router.get("/persons/:personId/partners", (req, res) => {
  const personId = parseInt(req.params.personId);
  const partners = data["partners"].filter(x => x.personId === personId || x.otherHalfId === personId);
  res.status(200).json(partners);
});

// Delete all partners of a person
router.delete("/persons/:personId/partners", (req, res) => {
  const personId = parseInt(req.params.personId);
  data["partners"] = data["partners"].filter(x => x.personId !== personId && x.otherHalfId !== personId);
  res.status(200).json({ message: "Partners removed" });
});

// Add a partner to a person
router.post("/persons/:personId/partners", (req, res) => {
  data["partners"].push(req.body);
  res.status(201).json(req.body);
});

// Update a person's partners
router.put("/persons/:personId/partners", (req, res) => {
  data["partners"].push(req.body);
  res.status(201).json(req.body);
});

// Get a specific partner relationship
router.get("/persons/:personId/partners/:partnerId", (req, res) => {
  const partnerId = parseInt(req.params.partnerId);
  const partner = data["partners"].find(x => x.id === partnerId);
  res.status(200).json(partner || { error: "Partner not found" });
});

// Update a specific partner relationship
router.put("/persons/:personId/partners/:partnerId", (req, res) => {
  const partnerId = parseInt(req.params.partnerId);
  const ind = data["partners"].findIndex(x => x.id === partnerId);
  if (ind !== -1) {
    data["partners"][ind] = { ...data["partners"][ind], ...req.body };
    return res.status(200).json(data["partners"][ind]);
  }
  res.status(404).json({ error: "Partner not found" });
});

// Delete a specific partner relationship
router.delete("/persons/:personId/partners/:partnerId", (req, res) => {
  const partnerId = parseInt(req.params.partnerId);
  const ind = data["partners"].findIndex(x => x.id === partnerId);
  if (ind !== -1) {
    data["partners"].splice(ind, 1);
    return res.status(200).json({ message: "Partner removed" });
  }
  res.status(404).json({ error: "Partner not found" });
});

module.exports = router;
