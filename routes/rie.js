var express = require('express');
var rieAdmin = require(__dirname + '/../config/rie');
var rie = require(__dirname + '/../controllers/rie');
var router = express.Router();

router.get('/allocation', rie.allocation);

module.exports = router;
