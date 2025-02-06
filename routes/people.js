const express = require("express");
const router = express.Router();

const People = [
  { Id: 1, name: "Rufai", nationality: "Nigerian"},
  { Id: 2, name: "Samuel", nationality: "Nigerian"},
  { Id: 3, name: "Nengi", nationality: "Nigerian"},
  { Id: 4, name: "Jamiu", nationality: "Senegalese"},
  { Id: 5, name: "Paula", nationality: "Nigerian"},
];


// get the list of people
router.get("/", (req, res) => {
  res.status(200).json(People);
});


// put a new person to the list
router.post("/new-person", (req, res) => {
  const newPerson = req.body;
  People.push(newPerson);
  res.status(201).json(newPerson);
});

// update the list of people
router.put("/update-people", (req, res) => {
  const updatedPeople = req.body;
  People.splice(0, People.length, ...updatedPeople);
  res.status(200).json(People);
});

// clear all apartments
router.delete("/delete-people", (req, res) => {
  People.splice(0, People.length);
  res.status(200).json({ message: "All apartments deleted" });
});

// get a person with their id
router.get("/:PersonId", (req, res) => {
  const PersonId = parseInt(req.params.PersonId);
  const person = People.find((a) => a.PersonId === PersonId);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ message: "person not found" });
  }
});

// edit a person's info with their id
router.put("/:ApartmentId", (req, res) => {
  const ApartmentId = parseInt(req.params.ApartmentId);
  const updatedApartment = req.body;
  const index = Apartments.findIndex((a) => a.ApartmentId === ApartmentId);
  if (index !== -1) {
    Apartments[index] = { ...Apartments[index], ...updatedApartment };
    res.status(200).json(Apartments[index]);
  } else {
    res.status(404).json({ message: "Apartment not found" });
  }
});

// remove a particular person with their id
router.delete("/:PersonId", (req, res) => {
  const PersonId = parseInt(req.params.PersonId);
  const index = People.findIndex((a) => a.PersonId === PersonId);
  if (index !== -1) {
    People.splice(index, 1);
    res.status(200).json({ message: "person deleted" });
  } else {
    res.status(404).json({ message: "person not found" });
  }
});

module.exports = router;
