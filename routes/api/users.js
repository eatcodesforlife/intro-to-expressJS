const express = require("express");
const users = require("../../Users");
const router = express.Router();
const uuid = require("uuid");

// get all users
router.get("/", (req, res) => res.json(users));

// get user id
router.get("/:id", (req, res) => {
  let uid = users.some((user) => user.id === parseInt(req.params.id));

  if (uid) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ error: "No user found" });
  }
});

// create a user
router.post("/", (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ error: "please add name or email" });
  }

  users.push(newUser);
  // res.json(users);
  res.redirect("/");
});

// update a user

router.put("/:id", (req, res) => {
  let uid = users.find((user) => user.id === parseInt(req.params.id));

  if (uid) {
    const updatedUser = req.body;
    users.map((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updatedUser.name ? updatedUser.name : user.name;
        user.email = updatedUser.email ? updatedUser.email : user.email;

        res.json([{ message: "user updated succesfuly" }, { user }]);
      }
    });
  } else {
    res.status(400).json({ error: "no user found" });
  }
});

// delete a user
router.delete("/:id", (req, res) => {
  let uid = users.find((user) => user.id === parseInt(req.params.id));

  if (uid) {
    res.json(users.filter((user) => user.id !== parseInt(req.params.id)));
  } else {
    res.status(400).json({ error: "No user found" });
  }
});

module.exports = router;
