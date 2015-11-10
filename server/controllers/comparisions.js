var             express  = require('express'),
                mongoose = require('mongoose'),
              bodyParser = require('body-parser'),
              morgan     = require('morgan');


var ComparisionsController = express.Router();
var Comparision = require('../models/comparision');

// Routes
ComparisionsController.get('/', function(req, res){
  Comparision.find({}, function(err, comparisions){
  res.json(comparisions);
  });
});

ComparisionsController.delete('/:id', function(req, res){
  var id = req.params.id;
  Comparision.findByIdAndRemove(id, function(){
    res.json({status: 202, message: 'Success'});
  });
});

ComparisionsController.post('/', function(req, res){
  var comparision = new Comparision(req.body);
  comparision.save(function(){
    res.json(comparision);
  });
});

ComparisionsController.patch('/:id', function(req, res){
  Comparision.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedComparision){
    res.json(updatedComparision);
  });
});



module.exports = ComparisionsController;
