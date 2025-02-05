const express = require("express");
const router = express.Router();

const dataLearners = [
  { learnerId: 1, name: "Philip Dave", centerId: 1 },
  { learnerId: 2, name: "Jane Doe", centerId: 3 },
  { learnerId: 3, name: "John Doe", centerId: 4 },
  { learnerId: 4, name: "David Beckham", centerId: 1 },
  { learnerId: 5, name: "Bukayo Saka", centerId: 2 },
  { learnerId: 6, name: "Ollie Watkins", centerId: 2 },
  { learnerId: 7, name: "Jordan Pickford", centerId: 1 },
];

const dataCenter = [
  { centerId: 1, centerName: "Apex tutorial center" },
  { centerId: 2, centerName: "Max center" },
  { centerId: 3, centerName: "A Makers" },
  { centerId: 4, centerName: "Peak tutors" },
];

// Adds a new center
router.post("/", (req, res, next) => {
  const { name } = req.body;
  const data = { centerId: dataCenter.length + 1, centerName: name };
  dataLearners.push(data);
  res.status(200).json(data);
});

// Fetches the list of all centers
router.get("/", (req, res, next) => {
  res.status(200).json(dataCenter);
});

// Updates a list of rows in the Center table
router.put("/", (req, res, next) => {
  res.status(200).json({ message: "Tutorial centers updated successfully" });
});

// Deletes a list of centers from center table
router.delete("/", (req, res, next) => {
  res.status(200).json({ message: "Centers deleted successfully" });
});

// Fetches a Center record
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({data: dataCenter.find(center=> center.centerId == id)});
});

// Updates a Center recod
router.put("/:id", (req, res, next) => {
  res.status(200).json({ message: "Learner updated successfully" });
});

// Delete a Center record
router.delete("/:id", (req, res, next) => {
  res.status(200).json({ message: "Learner deleted successfully" });
});

// Fetches a center's learners
router.get("/:centerId/learners", (req, res, next) => {
  const { centerId } = req.params;
  let center = dataCenter.find(center=> center.centerId == centerId);
  res.status(200).json({data: dataLearners.filter(learners => learners.centerId === center.centerId)});
});

// Adds a new learner to a center
router.post("/:centerId/learners", (req, res, next) => {
    const { name } = req.body;
    const centerId = req.params

    const data = { learnerId: dataLearners.length + 1, name: name, centerId: centerId};
    dataSchools.push(data);

    res.status(200).json(data);
});

// Updates the entire center's learner table 
router.put("/:centerId/learners", (req, res, next) => {
  res.status(200).json({message: "Learners updated successfully"});
});

// Deletes the entire center's learner table
router.delete("/:centerId/learners", (req, res, next) => {
  res.status(200).json({ message: "Learners deleted"});
});

// Fetches a learner record from a center
router.get("/:centerId/learners/:learnerId", (req, res, next) => {
  const { centerId, learnerId} = req.params
  const data = dataLearners.find(learner=> learner.learnerId == learnerId)
  res.status(200).json({data});
});

// Updates a learner
router.put("/:centerId/learners/:learnerId", (req, res, next) => {
  res.status(200).json({message: "Learner updated successfully"});
});

// Delete a learner
router.delete("/:centerId/learners/:learnerId", (req, res, next) => {
  res.status(200).json({message: "Learner deleted successfully"});
});

module.exports = router;
