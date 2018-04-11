var express = require('express');
var project = require(__dirname + '/project');
var rieAdmin = require(__dirname + '/../config/rie');
var rie = require(__dirname + '/rie');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

function ensureRole(role){
  return function(req, res, next){
    if((req.user._json.preferred_username.indexOf("@nushigh.edu.sg") > -1) && role == "student"){
      next();
    }else if((req.user._json.preferred_username.indexOf("@nus.edu.sg") > -1) && role == "staff"){
      next();
    }else if((rieAdmin.indexOf(req.user._json.preferred_username) > -1) && role == "admin"){
      next();
    }else{
      res.sendStatus(403);
    }
  }
}

router.use('/rie', ensureAuthenticated, ensureRole("admin"), rie);

router.use('/project', ensureAuthenticated, project);

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/home', ensureAuthenticated, function(req, res){
  res.render('home', {user: req.user});
});


module.exports = router;
