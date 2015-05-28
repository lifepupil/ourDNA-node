'use strict';

// var Person = require('../../../models/person');
var Chromosome = require('../../../models/chromosome');
// var fs = require('fs');
// var async = require('async');
// var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/people/{rsId}',
    config: {
      description: 'Retrieve genotype of a SNP rsid',
      handler: function(request, reply){
        console.log('inside the handler');
        console.log('rsId: ', request.params.rsId);
        // var rsid = request.params.rsId;
        // { chrom: { $elemMatch: { rsid: request.params.rsId } } }
        Chromosome.find({'chrom.rsid': request.params.rsId}, {surName: 1, givenName: 1, sex: 1, chromosomeId: 1, "chrom.$": 1}, function(err, matchingSNPs){
        // Chromosome.find({ chrom: { $elemMatch: { rsid: request.params.rsId } } }, {"genotype.$": 1}, function(err, matchingSNPs){
        // Chromosome.find({'chrom.rsid': request.params.rsId}, function(err, matchingSNPs){
          console.log('errer', err);
          // console.log('matchingSNPs', matchingSNPs);
          return reply(matchingSNPs);
        });
      }
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'person.getGenotype'
}
