var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var ArtefactSchema = new mongoose.Schema({
  name: {type: String, lowercase: true,  required: [true, "can't be blank"], index: true},
  type: {type: String, lowercase: true, required: [true, "can't be blank"], index: true},
  price: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.Save = function() {

};

mongoose.model('Artefact', ArtefactSchema);
