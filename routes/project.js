var express = require('express');
var project = require(__dirname + '/../controllers/project')
var router = express.Router();

router.get('/:id', project.viewOne);

router.get('/', project.all)

router.get('/alumni', project.alumni);

module.exports = router;
