/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const crypto = require("crypto");

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

router.get("/finduser", (req, res) => {
  console.log('hiiiii');
  console.log(req.query);
  User.findById(req.query.id).then((user) => {
    if (user.publicid) {
      res.send(user);
    }
    else {
      User.findByIdAndUpdate(req.query.id, {publicid: crypto.randomBytes(16).toString("hex")}).then((user2) => 
        {
          User.findById(req.query.id).then((user3) => res.send(user3));
        }
      );
    }
  })
})

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
  Progress.find({googleid: req.body.googleid}).sort({createdAt: -1}).limit(20).then((p) => res.send(p));
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
