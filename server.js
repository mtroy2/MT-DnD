var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require ("mongoose");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var models;
var uristring =
  process.env.MONGODB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/MT-DnD';

var theport = process.env.PORT || 8080;

// Makes connection asynchronously.  Mongoose will queue up database
   // operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    process.exit(1);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(theport, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

  models = require('./models')(mongoose);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/npcs"
 *    GET: finds all npcs
 *    POST: creates a new npc
 */

 app.get("/api/npcs", function(req, res) {
   models.Npcs.find({}).exec(function(err, npcs){
     if (err) {
       handleError(res, err.message, "Failed to get npcs.");
     } else {
       res.status(200).json(npcs);
     }
   });
 });

 app.post("/api/npcs", function(req, res) {

   if (!req.body.name) {
     handleError(res, "Invalid user input", "Must provide a name.", 400);
   }

   var newNpc = new models.Npcs(req.body);
   newNpc.save(function(err,doc){
     if (err) {
       handleError(res, err.message, "Failed to create new npc.");
     } else {
       res.status(201).json(doc);
     }
   });
 });

 /*  "/api/npcs/:id"
  *    GET: find npc by id
  *    PUT: update npc by id
  *    DELETE: deletes npc by id

 app.get("/api/npcs/:id", function(req, res) {
   db.collection(NPCS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to get npc");
     } else {
       res.status(200).json(doc);
     }
   });
 });

 app.put("/api/npcs/:id", function(req, res) {
   var updateDoc = req.body;
   delete updateDoc._id;

   db.collection(NPCS_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
     if (err) {
       handleError(res, err.message, "Failed to update npc");
     } else {
       updateDoc._id = req.params.id;
       res.status(200).json(updateDoc);
     }
   });
 });

 app.delete("/api/npcs/:id", function(req, res) {
   db.collection(NPCS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
     if (err) {
       handleError(res, err.message, "Failed to delete npc");
     } else {
       res.status(200).json(req.params.id);
     }
   });
 });
*/
