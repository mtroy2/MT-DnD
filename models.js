var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = function(mongoose){
  var Npc = new Schema({
    name : {type: String, index: true},
    id   : ObjectId,
    age  : { type: Number, min: 0}
  });

  var models = {
    Npcs : mongoose.model('Npcs', Npc)
  };
  return models;
}
