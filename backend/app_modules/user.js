const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const response = require("./reponses");

// Connection URL
const url = 'mongodb+srv://apibuffa:Rammstein1998@nodejsbuffa-4j8sk.gcp.mongodb.net';

// Bcrypt
const BCRYPT_SALT_ROUNDS = 12;

// Database Name
const dbName = 'projetbuffa';

/** Partie compte **/

exports.connexion = function (req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        db.collection("users")
          .findOne({username: req.body.username})
          .then((user) => {
              if (!user) {
                  response.baseResponse(404, "User not exists", null, res)
              } else {
                  bcrypt.compare(req.body.mdp, user.mdp, function (err, result) {
                      if (result) {
                          response.baseResponse(200, "Logged in !", user, res)
                      } else {
                          response.baseResponse(403, "Password not matching", null, res)
                      }
                  });
              }
          })
    });
};

exports.creationCompte = function (req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        if (!err) {
            db.collection("users")
              .findOne({username: req.body.username})
              .then(user => {
                  if (!user) {
                      bcrypt.hash(req.body.mdp, BCRYPT_SALT_ROUNDS, function (err, hash) {
                          db.collection("users").insertOne({
                              username: req.body.username,
                              mdp: hash,
                              orders: []
                          }, function (error, result) {
                              if (!error) {
                                  response.baseResponse(200, "User added", result.ops[0], res);
                              } else {
                                  response.baseResponse(500, "Internal error", error, res);
                              }
                          });
                      });
                  } else {
                      response.baseResponse(409, "User already exists.", null, res)
                  }
              })
        } else {
            response.baseResponse(500, "Internal Error", null, res);
        }
    });
};

exports.getByUsername = function (req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        if (!err) {
            db.collection("users")
              .findOne({username: req.query.username})
              .then(user => {
                  if (!user) {
                      response.baseResponse(404, "User doesn't exist.", null, res)
                  } else {
                      response.baseResponse(200, "User details.", user, res)
                  }
              })
        } else {
            response.baseResponse(500, "Internal Error", null, res);
        }
    });
};

exports.order = function (body, req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        let body;

        try {
            body = JSON.parse(JSON.stringify(body));
        } catch (e) {
            response.baseResponse(500, "Internal error", e, res);
        }
        if (!err) {
            db.collection("users")
              .findOne({username: req.body.username})
              .then(user => {
                  if (!user) {
                      response.baseResponse(404, "User doesn't exist.", null, res)
                  } else {
                      db.collection('users').updateOne( { username: body.username }, { $set: { "orders":  user.orders.push(body.order)} } );
                  }
              })
        } else {
            response.baseResponse(500, "Internal Error", null, res);
        }
    });
};
