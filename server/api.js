/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Goal = require("./models/goal");
const Progress = require("./models/progress");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();


router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/addGoal", (req, res) => {
  const goal = new Goal({
    name: req.body.name, 
    desc: req.body.desc, 
    googleid: req.body.googleid
  });
  goal.save().then((goal) => res.send(goal));
})

router.post("/getGoals", (req,res) => {
  Goal.find({googleid: req.body.googleid}).then((goals) => res.send(goals));
})

router.post("/sendProgress", (req, res) => {
  const prog = new Progress({
    googleid: req.body.googleid,
    progress: req.body.progress, 
    comment: req.body.comment,
  });
  prog.save().then((p) => res.send(p));
})

router.post("/getProgress", (req,res) => {
  Progress.find({googleid: req.body.googleid}).sort({created_at: -1}).limit(10).then((p) => res.send(p));
})

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
