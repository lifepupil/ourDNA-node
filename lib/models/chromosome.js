'use strict';

var Mongoose = require('mongoose');
// var fs = require('fs');

var chromosomeSchema = Mongoose.Schema({
	surName: {type: String},
	givenName: {type: String},
	sex: {type: String},
  chromosomeId: {type: String},
	fileName: {type: String},
	// uid: {type: String, required: true},
	// userId: {type: Mongoose.Schema.Object.Id, ref: 'User', required: true},
	// createdAt: {type: Date, required: true, default: Date.now},
	chrom: [{
		rsid: {type: String},
		chromosome: {type: String},
		position: {type: Number},
		genotype: {type: String}
	}]
});

var Chromosome = Mongoose.model('Chromosome', chromosomeSchema);
module.exports = Chromosome;


// console.log('inside personSchema ~!~!~!~!~!~!~!~!~!~!~!~!~!~~!~!');
// var t = fs.readFileSync('/Users/lifepupil/Code/ourDNA/node/lib/models/test.txt', 'ascii');
// console.log('file data: ', t);
