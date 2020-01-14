const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const response = require("./reponses");

// Connection URL
const url = 'mongodb+srv://apibuffa:Rammstein1998@nodejsbuffa-4j8sk.gcp.mongodb.net';

// Database Name
const dbName = 'projetbuffa';


/** Partie entree **/

exports.findEntree = function (page, pagesize, name, req, res) {
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);

        if (!err) {
            if (name === '') {
                db.collection('entrees')
                  .find()
                  .skip(page * pagesize)
                  .limit(pagesize)
                  .toArray()
                  .then(arr => {
                      db.collection('entrees')
                        .countDocuments()
                        .then(rep => response.baseResponse(200, rep, arr, res))
                  });
            } else {
                let query = {
                    "name": {$regex: ".*" + name + ".*", $options: "i"}
                };
                db.collection('entrees')
                  .find(query)
                  .skip(page * pagesize)
                  .limit(pagesize)
                  .toArray()
                  .then(arr => {
                      db.collection('entrees')
                        .find(query)
                        .countDocuments()
                        .then(rep => response.baseResponse(200, rep, arr, res))
                  });
            }
        } else {
            response.baseResponse(500, "Internal error", null, res)
        }
    });
};

exports.findEntreeById = function (ids, req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        if (!err) {
            let myquery;
            try {
                myquery = {"_id": {$in: ids.map(element => ObjectId(element))}};
            } catch (e) {
                response.baseResponse(500, "Internal error", null, res);
                return
            }
            db.collection("entrees")
              .find(myquery)
              .toArray()
              .then(arr => {
                  response.baseResponse(200, "Entree details", arr, res);
              })
        } else {
            response.baseResponse(500, "Database error", null, res);
        }
    });
};
