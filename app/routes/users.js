const db = require('../db.js');
var express = require('express');
var router = express.Router();
var md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.query('select * from users', function(err, rows, fields) {
		if (err) throw err
		res.json(rows);
	})

});

router.post('/', function(req, res) {
	const {username, password} = req.body;
	console.log(username);
	db.query('SELECT * FROM users', function(err, results, fields) {
		for (let i = 0; i < results.length; i++) { 
			if (username === results[i].username) {
				if (md5(password) === results[i].password) {
					req.session.username = username;
					res.render("loggedIn");
					return
				}
			}
		}
		res.redirect("/");
	})
})

module.exports = router;
