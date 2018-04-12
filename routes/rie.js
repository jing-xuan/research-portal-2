var express = require('express');
var rieAdmin = require(__dirname + '/../config/rie');
var rie = require(__dirname + '/../controllers/rie');
var router = express.Router();

router.get('/allocation', rie.allocation);

router.get('/dlAllocTemp', rie.dlAllocTemp);

router.post('/ulProjAlloc', rie.ulProjAlloc);

module.exports = router;
