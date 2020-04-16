var express = require('express');
var router = express.Router();
const fs = require('fs');
var parse = require('csv-parse');
var csvData = [];
var totalSum = 0;
var output = [];
router.post('/', function(req, res) {
	totalSum = 0;
	output = [];
	csvData = [];
	fs.createReadStream(req.body.myCSV)
	.pipe(parse({delimiter: ':'}))
	.on('data', function(csvrow) {
		csvData.push(csvrow);
	})
	.on('end', function() {
		// console.log(csvData);
		var totalValues;
		var hide = "<div id = 'display'>Please enter a csv that sums to 100</div>"
		
		for (var i = 0; i < csvData.length; i++) {
			if (csvData[i][0].startsWith("total")) {
				totalValues = csvData[i][0].split(",");
				totalValues = totalValues.slice(1);
				totalValues = totalValues.map(function(x) {
					return parseInt(x, 10);
				});
				for (var check = 0; check < totalValues.length; check++) {
					totalSum += totalValues[check];
				}
			}
			output.push("<tr><td>" + csvData[i][0].split(",").join("</td><td>") + "</td></tr>");
		}
		var object = [];
		var headers = csvData[0][0].split(",");
		for (var x = 1; x < csvData.length; x ++) {
			var obj = {};
			var currentLines = csvData[x][0].split(",");
			for (var j = 0; j < headers.length; j++) {
				obj[headers[j].trim()] = currentLines[j];
			}
			object.push(obj);
		}

		JSON.stringify(object);
		if (totalSum === 100) {
			output = "<table id = 'data'>" + output.join("") + "</table>";

			res.render("histogram", {object});
			totalSum = 0;
			output = [];
			return;
		} else {
			console.log(totalSum);
			console.log("not 100");
			return;
		}

	})
	// res.send(output);
})

module.exports = router;