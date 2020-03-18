var db = require(__dirname + '/../config/db');

exports.all = function(req, res){
  db.query("SELECT * FROM project", function(err, result){
    if(!result) {
      res.sendStatus(500);
      console.log(err);
    }
    if(result){
    var mentorList = [ "M1", "M2", "M3", "T1", "T2",];
    var List = ["S2_Name", "S3_Name", "S4_Name"];
    var projList = [];
    var orgList = [];
    //loop through all projects
    for(var i = 0; i < result.length; i++){
      var proj = [];
      var mlist = "";
      var sList = result[i]["S1_Name"];
      //collate all mentor names into 1 string for display
      for(var j = 0; j < 5; j++){
        if(result[i][mentorList[j]] != null){
          if(mlist.length != 0){
            mlist += ", ";
          }
          mlist += result[i][mentorList[j]];
        }
      }
      //collate all students name into 1 string for display
      for(var x = 0; x < 3; x++){
        if(result[i][List[x]] != null){
          sList += ", ";
          sList += result[i][List[x]];
        }
      }
      proj.push(result[i]['p_title']);
      proj.push(result[i]['p_org']);
      if(orgList.indexOf(result[i]['p_org']) == -1){
        //getting list of all organisations for drop down list in display
        orgList.push(result[i]['p_org']);
      }
      //putting all data into 1 array
      proj.push(result[i]['p_dept']);
      proj.push(mlist);
      proj.push(sList);
      proj.push(result[i]['p_code']);
      //pushing each project array into the list of all projects
      projList.push(proj);
    }
    res.render('projects', {projects: projList, org: orgList});
  }
})
}

exports.alumni = function(req, res){
  res.render('alumni');
}

exports.viewOne = function(req, res){
  db.query("SELECT * FROM project WHERE p_code = '" + req.params.id + "'", function(err, results){
    if(!results){
      console.log(err);
      res.sendStatus(500);
    }
    if(results){
      console.log(results);
      res.render('project', {projectData: results[0]});
    }
  });
}
