'use strict';

var Mongoose = require('mongoose');
// var fs = require('fs');

var personSchema = Mongoose.Schema({
	surName: {type: String},
	givenName: {type: String},
	sex: {type: String},
	fileName: {type: String},
	// uid: {type: String, required: true},
	// userId: {type: Mongoose.Schema.Object.Id, ref: 'User', required: true},
	// createdAt: {type: Date, required: true, default: Date.now},
	snpArr: [{
		rsid: String,
		chromosome: String,
		position: Number,
		genotype: String
	}],
	// theFile: {type: String}
});

var Person = Mongoose.model('Person', personSchema);
module.exports = Person;


// console.log('inside personSchema ~!~!~!~!~!~!~!~!~!~!~!~!~!~~!~!');
// var t = fs.readFileSync('/Users/lifepupil/Code/ourDNA/node/lib/models/test.txt', 'ascii');
// console.log('file data: ', t);
