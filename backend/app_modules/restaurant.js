const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const response = require("./reponses");

// Connection URL
const url = 'mongodb+srv://apibuffa:Rammstein1998@nodejsbuffa-4j8sk.gcp.mongodb.net';

// Database Name
const dbName = 'projetbuffa';

exports.countRestaurants = function (name, req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        if (!err) {
            if (name === '') {
                db.collection('restaurants')
                  .countDocuments()
                  .then(rep => response.baseResponse(200, null, rep, res));
            } else {
                let query = {
                    "name": {$regex: ".*" + name + ".*", $options: "i"}
                };
                db.collection('restaurants')
                  .find(query)
                  .countDocuments()
                  .then(rep => response.baseResponse(200, null, rep, res));

            }
        }
    });
};

exports.findRestaurants = function (page, pagesize, name, req, res) {
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);

        if (!err) {
            if (name === '') {
                db.collection('restaurants')
                  .find()
                  .skip(page * pagesize)
                  .limit(pagesize)
                  .toArray()
                  .then(arr => {
                      db.collection('restaurants')
                        .countDocuments()
                        .then(rep => response.baseResponse(200, rep, arr, res))
                  });
            } else {
                let query = {
                    $or: [
                        {"name": {$regex: ".*" + name + ".*", $options: "i"}},
                        {"cuisine": {$regex: ".*" + name + ".*", $options: "i"}},
                        {"borough": {$regex: ".*" + name + ".*", $options: "i"}}
                    ]
                };
                db.collection('restaurants')
                  .find(query)
                  .toArray()
                  .then(arr => {
                      db.collection('restaurants')
                        .find(query)
                        .count()
                        .then(rep => response.baseResponse(200, rep, arr, res))
                  });
            }
        } else {
            response.baseResponse(500, "Internal error", null, res)
        }
    });
};

exports.findRestaurantById = function (ids, req, res) {
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
            db.collection("restaurants")
              .find(myquery)
              .toArray()
              .then(data => {
                  response.baseResponse(200, "Restaurant details", data, res);
              })
        } else {
            response.baseResponse(500, "Database error", null, res);
        }
    });
};

exports.createRestaurant = function (restaurant, req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        let newRestaurant;
        try {
            newRestaurant = JSON.parse(JSON.stringify(req.body));
            newRestaurant.grades = [];


        } catch (e) {
            console.log(e);
        }

        if (!err) {
            //     db.collection("restaurants")
            //       .insertOne(toInsert, function (err, insertedId) {
            //           let reponse;
            //
            //           if (!err) {
            //               reponse = {
            //                   succes: true,
            //                   result: insertedId.ops[0]._id,
            //                   error: null,
            //                   msg: "Ajout réussi " + insertedId.ops[0]._id
            //               };
            //           } else {
            //               reponse = {
            //                   succes: false,
            //                   error: err,
            //                   msg: "Problème à l'insertion"
            //               };
            //           }
            //           callback(reponse);
            //       });
            // } else {
            //     let reponse = reponse = {
            //         succes: false,
            //         error: err,
            //         msg: "Problème lors de l'insertion, erreur de connexion."
            //     };
            //     callback(reponse);
        }
    });
}

exports.updateRestaurant = function (id, formData, callback) {

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        if (!err) {
            let myquery = {"_id": ObjectId(id)};
            let newvalues = {
                name: formData.nom,
                cuisine: formData.cuisine
            };

            db.collection("restaurants")
              .replaceOne(myquery, newvalues, function (err, result) {
                  if (!err) {
                      reponse = {
                          succes: true,
                          result: result,
                          error: null,
                          msg: "Modification réussie " + result
                      };
                  } else {
                      reponse = {
                          succes: false,
                          error: err,
                          msg: "Problème à la modification"
                      };
                  }
                  callback(reponse);
              });
        } else {
            let reponse = reponse = {
                succes: false,
                error: err,
                msg: "Problème lors de la modification, erreur de connexion."
            };
            callback(reponse);
        }
    });
};

exports.deleteRestaurant = function (id, callback) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        if (!err) {
            let myquery = {"_id": ObjectId(id)};

            db.collection("restaurants")
              .deleteOne(myquery, function (err, result) {
                  if (!err) {
                      reponse = {
                          succes: true,
                          result: result,
                          error: null,
                          msg: "Suppression réussie " + result
                      };
                  } else {
                      reponse = {
                          succes: false,
                          error: err,
                          msg: "Problème à la suppression"
                      };
                  }
                  callback(reponse);
              });
        } else {
            let reponse = reponse = {
                succes: false,
                error: err,
                msg: "Problème lors de la suppression, erreur de connexion."
            };
            callback(reponse);
        }
    });
};
