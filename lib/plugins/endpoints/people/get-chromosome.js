'use strict';

// var Person = require('../../../models/person');
var Chromosome = require('../../../models/chromosome');
// var fs = require('fs');
// var async = require('async');
// var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/people/chromosomeId/{chromId}',
    config: {
      description: 'Retrieve all SNPs for selected chromosome',
      handler: function(request, reply){
        console.log('inside the get chromosome handler');
        console.log('chromId: ', request.params.chromId);

        Chromosome.find({'chromosomeId': request.params.chromId}, function(err, chromosomeSet){
          // console.log('chromosomeSet is ', chromosomeSet);
          console.log('errer', err);
          return reply(chromosomeSet);
        });
      }
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'person.getChromosome'
}
