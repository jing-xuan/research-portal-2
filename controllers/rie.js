var xlsx = require('node-xlsx');
var formidable = require('formidable');
var fs = require('fs');
var db = require('/JX/CS/research-portal-2/config/db');

exports.allocation = function(req, res){
  res.render('rieallocation');
}

exports.dlAllocTemp = function(req, res){
  res.download(__dirname + "/../import/projectAllocationTemplate.xlsx");
}

exports.ulProjAlloc = function(req, res){
  var form = formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function(name, file){
    file.path = __dirname + '/../import/projAllocList.xlsx';
  });
  form.on('end', function(){
    console.log('Uploaded');
    var data = xlsx.parse(fs.readFileSync(__dirname + '/../import/projAllocList.xlsx'))[0]['data'];
    data.shift();
    db.query("INSERT INTO projalloc (title, description, org, noStudents) VALUES ?", [data], function(err, val){
      if (err) throw err;
      console.log(val);
    });

  });
  res.redirect('/rie/allocation');
}
