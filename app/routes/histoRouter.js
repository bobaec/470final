var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true}));

// router.post('/', function(req, res) {
// 	console.log(req.body.test);
// 	var values = req.body.test;
// 	// console.log(JSON.parse(values));
// 	res.render("histogram", {data: values})
// })

module.exports = router;