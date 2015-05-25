'use strict';

var Person = require('../../../models/person');
// var Joi = require('joi');

exports.register = function(server, options, next){
	server.route({
		method: 'POST',
		path: '/People',
		config: {
			description: 'Add a person',
			// validate: {
			// 	payload: {
			// 		name: Joi.string().min(1).required(),
			// 	}
			// },
			handler: function(request, reply){
				var person = new Person(request.payload);
				console.log(request.payload);
				person.save(function(){
					reply(person);
				});
			}
		}
	})

	return next();
}

exports.register.attributes = {
	name: 'person.add'
}
