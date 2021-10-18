const router = require("express").Router();    // defining the routes

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");      //render=ausfuehren 
});

module.exports = router;   //need to export the cntent so that we can use it in another file
