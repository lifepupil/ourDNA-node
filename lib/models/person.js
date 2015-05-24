'use strict';

var Mongoose = require('mongoose');

var personSchema = Mongoose.Schema({
	surName: {type: String},
	givenName: {type: String},
	// uid: {type: String, required: true},
	// userId: {type: Mongoose.Schema.Object.Id, ref: 'User', required: true},
	// createdAt: {type: Date, required: true, default: Date.now},
	snpArr: [{
		rsid: String,
		chromosome: String,
		position: Number,
		genotype: Number
	}]
});

var Person = Mongoose.model('Person', personSchema);
module.exports = Person;
