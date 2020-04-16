const mysql = require('mysql');

var con = mysql.createConnection({
	user: 'readonlyuser',
	host: '35.227.146.173',
	database: 'cmpt470',
	password: 'readonly',
})

con.connect(function(err) {
	if (err) throw err;
	console.log("connected");
});

module.exports = con