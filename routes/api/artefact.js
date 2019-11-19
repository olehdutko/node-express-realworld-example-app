var mongoose = require('mongoose');
var router = require('express').Router();
var Artefact = mongoose.model('Artefact');
var auth = require('../auth');

router.get('/artefact', auth.required, function(req, res, next){
  Artefact.findById(req.payload.id).then(function(artefact){
    if(!artefact){ return res.sendStatus(401); }
    return res.json({artefact: artefact.toAuthJSON()});
  }).catch(next);
});

router.put('/artefact', auth.required, function(req, res, next){
  Artefact.findById(req.payload.id).then(function(artefact){
    if(!artefact){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.artefact.name !== 'undefined'){
      artefact.name = req.body.artefact.name;
    }
    if(typeof req.body.artefact.type !== 'undefined'){
      artefact.type = req.body.artefact.type;
    }
    if(typeof req.body.artefact.price !== 'undefined'){
      artefact.price = req.body.artefact.price;
    }

    return artefact.save().then(function(){
      return res.json({artefact: artefact.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/artefact', function(req, res, next){
  var artefact = new Artefact();

  artefact.name = req.body.artefact.name;
  artefact.type = req.body.artefact.type;
  artefact.price = req.body.artefact.price;

  artefact.save().then(function(){
    return res.json({artefact: artefact.toAuthJSON()});
  }).catch(next);
});

module.exports = router;
