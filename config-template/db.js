var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "username",
	password: "password",
	database: "database"
});

con.connect(function(err) {
    if (err) console.log("DB disconnected");
    console.log("Connected to DB");
});

module.exports = con;
