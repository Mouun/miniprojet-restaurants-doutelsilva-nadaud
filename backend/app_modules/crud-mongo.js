const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const axios = require('axios');
const fs = require('fs');
const faker = require('faker');
const bcrypt = require('bcrypt');

const assert = require('assert');
const response = require("./reponses");

// Connection URL
const url = 'mongodb+srv://apibuffa:Rammstein1998@nodejsbuffa-4j8sk.gcp.mongodb.net';

// Bcrypt
const BCRYPT_SALT_ROUNDS = 12;

// Database Name
const dbName = 'projetbuffa';

/** Partie utils **/

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.insertImageFirstTime1 = function (callback) {

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        if (!err) {

            db.collection('users')
              .find()
              .forEach(async function (doc) {
                  let response1 = (await axios.get('https://source.unsplash.com/1280x720/?restaurant ')).request.res.responseUrl;
                  // let response2 = (await axios.get('https://source.unsplash.com/1600x900/?plate')).request.res.responseUrl;
                  // let response3 = (await axios.get('https://source.unsplash.com/1600x900/?plate')).request.res.responseUrl;
                  // let response5 = (await axios.get('https://source.unsplash.com/1600x900/?plate')).request.res.responseUrl;
                  //
                  //
                  //db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "thumbnail": response1 } } );
                  // db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "prix_min": random(10, 15) } } );
                  // db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "prix_max": random(25, 35) } } );
                  //db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "tel": faker.phone.phoneNumber('0165#######') } } );
                  //db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "description": faker.lorem.sentence() } } );
                  //db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "heure_ouverture":  random(8, 11)} } );
                  //db.collection('restaurants').updateOne( { _id: doc._id }, { $set: { "heure_fermeture":  random(19, 23)} } );
                  db.collection('users').updateOne( { _id: doc._id }, { $set: { "orders":  []} } );

              });

            callback({succes: true})

            // db.collection("restaurants")
            //   .replaceOne(myquery, newvalues, function(err, result) {
            // 	  if(!err){
            // 		  reponse = {
            // 			  succes : true,
            // 			  result: result,
            // 			  error : null,
            // 			  msg: "Modification réussie " + result
            // 		  };
            // 	  } else {
            // 		  reponse = {
            // 			  succes : false,
            // 			  error : err,
            // 			  msg: "Problème à la modification"
            // 		  };
            // 	  }
            // 	  callback(reponse);
            //   });
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

exports.insertImageFirstTime = function (callback) {
    MongoClient.connect(url, function (err, client) {

        if (!err) {
            const db = client.db(dbName);
            db.collection("plats").find().toArray().then(plats => {
                let menuList = [];
                let j = 0;
                let menuCountMax = 0;
                let menuListIterator = 0;

                db.collection('restaurants')
                  .find()
                  .forEach(function (doc) {
                      while (menuCountMax < 11) {
                          if (menuListIterator === plats.length - 1) {
                              menuListIterator = 0;
                          }
                          menuList.push(plats[menuListIterator]._id);
                          menuListIterator++;
                          menuCountMax++;
                      }
                      db.collection('restaurants').updateOne({_id: doc._id}, {$set: {"plats": menuList}});
                      menuList = [];
                      menuCountMax = 0;
                  });
                callback({succes: true})
            });
        } else {
            callback({succes: false})
        }
    });
};
