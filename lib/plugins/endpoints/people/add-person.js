'use strict';

var Person = require('../../../models/person');
var Chromosome = require('../../../models/chromosome');
var fs = require('fs');
var async = require('async');
// var Joi = require('joi');
var isWorking = false;

exports.register = function(server, options, next){
	server.route({
		method: 'POST',
		path: '/people',
		config: {
			description: 'Add a person',
			handler: function(request, reply){
				console.log('STARTING POST /people HANDLER');
				if(!isWorking){
					isWorking = true;

					var personChrom;
					var personChromArr = [];
					var chromosomes = [];
					for(var c = 0; c < 25; c++){
						var chromosome = [];
						chromosomes.push(chromosome);
					}
					var cId = 0;

					var fileStr = fs.readFileSync('/Users/lifepupil/Code/ourDNA/node/dnaFiles/' + request.payload.fileName, 'ascii');
					console.log('file name: ', request.payload.fileName);

			    var lineData = fileStr.split('\n');
			    for(var i = 0; i < lineData.length-1; i++){
			      if(lineData[i][0] !== '#'){
			      // if(lineData[i][0] !== '#' || lineData[i][0] !== ''){
							lineData[i] = lineData[i].replace(/\r/g, '');
							var data = lineData[i].split('\t');
	// console.log('data: ', data, '', i);
							var dataObj = {
			          rsid: data[0],
			          chromosome: data[1],
			          position: parseInt(data[2], 10),
			          genotype: data[3]
			        };

							if(data[1] !== 'X' && data[1] !== 'Y' && data[1] !== 'MT'){
								cId = parseInt(data[1], 10) - 1;
			        	chromosomes[cId].push(dataObj);
							}else if(data[1] === 'X'){
								cId = 22;
								chromosomes[cId].push(dataObj);
							}else if(data[1] === 'Y'){
								cId = 23;
								chromosomes[cId].push(dataObj);
							}else if(data[1] === 'MT'){
								cId = 24;
								chromosomes[cId].push(dataObj);
							}
			      }
			    }

					// for(var c = 23; c < 24; c++){
					for(var c = 0; c < chromosomes.length; c++){
						var cName = chromosomes[c][0].chromosome;

						var thisPersonChrom = {
							surName: request.payload.surName,
							givenName: request.payload.givenName,
							sex: request.payload.sex,
							chromosomeId: cName,
							chrom: chromosomes[c]
						}
						// console.log('chromosome name should be ', cName);
						// console.log('length of chromosome ', thisPersonChrom.chromosomeId, ' = ', thisPersonChrom.chrom.length);
						personChromArr.push(thisPersonChrom)
					};
			  	console.log('!@!@!@!@!@!!@!@!@!!@!@@!!!@!@!!@!@!!@!!');

					async.eachSeries(personChromArr, function(thisPersonChrom, cb) {
						console.log('START async - thisPersonChrom is ', thisPersonChrom.chromosomeId);
						personChrom = new Chromosome(thisPersonChrom);
						personChrom.save(function(err, doc) {
							if(err){
								console.log('problem with Mongoose save: ', err);
							} else {
								console.log('~~good save');
								console.log('person chromosome surName', personChrom.surName);
								console.log('person chromosome givenName', personChrom.givenName);
						  	console.log('done with chromosome ', personChrom.chromosomeId);
						  	console.log('~!~!~!~!~!~!~!~~!~!~!~!~!~!~!!~!~!~!~!~!~');
								console.log('');
								// return reply(doc);
							}

					    cb();
					  });
					}, function(err) {
						if(err){
					  	console.log('error from callback function: ', err);
							reply(err).code(400);
						} else {
							isWorking = false;
							reply();
					  	console.log('all done!');
						}
					});
				}


				// var i = 8;
				// var personChrom = new Chromosome(personChromArr[i]);
				// console.log('chromosome ', personChrom.chromosomeId, ' index ', i);
				// personChrom.save(function(){
				// 		reply(personChrom);
				// });
			}
		}
	})

	return next();
}

exports.register.attributes = {
	name: 'person.add'
}
