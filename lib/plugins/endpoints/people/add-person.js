'use strict';

var Person = require('../../../models/person');
var Chromosome = require('../../../models/chromosome');
var fs = require('fs');
// var Joi = require('joi');

exports.register = function(server, options, next){
	server.route({
		method: 'POST',
		path: '/people',
		config: {
			description: 'Add a person',
			handler: function(request, reply){
				var personChrom = {}
				var chromosomes = [];
				for(var c = 0; c < 25; c++){
					var chromosome = [];
					chromosomes.push(chromosome);
				}
				var cId = 0;

				// var thisPerson = new Person(request.payload);
				// thisPerson.save(function(){
				// 	reply(thisPerson);
				// });

				var fileStr = fs.readFileSync('/Users/lifepupil/Code/ourDNA/node//dnaFiles/' + request.payload.fileName, 'ascii');
				console.log('file name: ', request.payload.fileName);

		    var lineData = fileStr.split('\n');
		    for(var i = 0; i < lineData.length; i++){
		      if(lineData[i][0] !== '#'){
						lineData[i] = lineData[i].replace(/\r/g, '');
						var data = lineData[i].split('\t');

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

				var c = 0;
				var cNum = c + 1;
				var thisPersonChrom = {
					surName: request.payload.surName,
					givenName: request.payload.givenName,
					sex: request.payload.sex,
					chromosomeId: cNum,
					chrom: chromosomes[c]
				}

				var personChrom = new Chromosome(thisPersonChrom);

				console.log('person chromosome surName', personChrom.surName);
				console.log('person chromosome givenName', personChrom.givenName);
				console.log('person chromosome sex', personChrom.sex);
				console.log('person chromosome chromosomeId', personChrom.chromosomeId);
				console.log('person chromosome 1', personChrom.chrom[0]);



				// var t = Date(Date.now());
				// console.log('time: ', t);
				// console.log('length of chromosomes array ', chromosomes.length);
				// for(var c = 0; c < 25; c++){
				// 	console.log('chromosome ' + c + ' value ', chromosomes[c][0]);
				// }
				// thisPerson.snpArr = [];
				// for(var i = 0; i < dataArr.length; i++){
				// 	thisPerson.snpArr.push(dataArr[i]);
				personChrom.save(function(){
						reply(personChrom);
				});
				// }

				// thisPerson.snpArr.push(dataArr);
				// console.log('thisPerson array', thisPerson.snpArr);
				// var person = new Person(thisPerson);
				// // console.log('INSIDE THE HANDLER');
				// console.log(request.payload.surName);

				// person.save(function(){
				// 	reply(person);
				// });
			}
		}
	})

	return next();
}

exports.register.attributes = {
	name: 'person.add'
}
