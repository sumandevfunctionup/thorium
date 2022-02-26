const express = require('express');
const router = express.Router();

let persons = [
  {
    name: "suman",
    age: 10,
    votingStatus: false
  },
  {
    name: "pritesh",
    age: 25,
    votingStatus: false
  },
  {
    name: "Rajesh",
    age: 70,
    votingStatus: false
  },
  {
    name: "Siraj",
    age: 18,
    votingStatus: false
  },
  {
    name: "Samrat",
    age: 28,
    votingStatus: false
  }
]

router.post("/voting-post", function (req, res) {
  let votingAge = req.query.votingAge

  let newArray = [];
  for (let i = 0; i < persons.length; i++) {

    if (persons[i].age > votingAge) {
      persons[i].votingStatus = true;
      newArray.push(persons[i])
    }
    else{
      persons[i].votingStatus = false;
      newArray.push(persons[i])
    }
  }
  if (newArray.length > 0) {
    return res.send(newArray)
  }
  else {
    return res.send("There is no voter found.")
  }
})

module.exports = router;