'use strict';

var Person = require('../../../models/person');
var fs = require('fs');
// var Joi = require('joi');

exports.register = function(server, options, next){
	server.route({
		method: 'POST',
		path: '/people',
		config: {
			description: 'Add a person',
			handler: function(request, reply){
				var dataArr = [];

				var thisPerson = new Person(request.payload);
				thisPerson.save(function(){
					reply(thisPerson);
				});
				// console.log('first reply', thisPerson);

				var fileStr = fs.readFileSync('/Users/lifepupil/Code/ourDNA/node//dnaFiles/' + thisPerson.fileName, 'ascii');
				console.log('file name: ', thisPerson.fileName);

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
		        dataArr.push(dataObj);
		      }
		    }
				// var t = Date(Date.now());
				// console.log('time: ', t);
				console.log('length of arr 1 ', dataArr.length);
				thisPerson.snpArr = [];
				for(var i = 0; i < dataArr.length; i++){
					thisPerson.snpArr.push(dataArr[i]);
					// thisPerson.save(function(){
					// 	// reply(thisPerson);
					// });
				}
				console.log('length of snpArr 2 ', thisPerson.snpArr.length);
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
