const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const response = require("./reponses");

// Connection URL
const url = 'mongodb+srv://apibuffa:Rammstein1998@nodejsbuffa-4j8sk.gcp.mongodb.net';

// Database Name
const dbName = 'projetbuffa';


/** Partie menus **/

exports.findMenus = function (page, pagesize, name, req, res) {
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);

        if (!err) {
            if (name === '') {
                db.collection('menus')
                  .find()
                  .skip(page * pagesize)
                  .limit(pagesize)
                  .toArray()
                  .then(arr => {
                      db.collection('menus')
                        .countDocuments()
                        .then(rep => response.baseResponse(200, rep, arr, res))
                  });
            } else {
                let query = {
                    "name": {$regex: ".*" + name + ".*", $options: "i"}
                };
                db.collection('menus')
                  .find(query)
                  .skip(page * pagesize)
                  .limit(pagesize)
                  .toArray()
                  .then(arr => {
                      db.collection('menus')
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

exports.findMenuById = function (ids, req, res) {
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
            db.collection("menus")
              .find(myquery)
              .toArray()
              .then(arr => {
                  response.baseResponse(200, "Menu details", arr, res);
              })
        } else {
            response.baseResponse(500, "Database error", null, res);
        }
    });
};

exports.updateMenu = function (id, formData, req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        if (!err) {
            let myquery = {"_id": ObjectId(id)};
            let newvalues = {
                entree: formData.entree,
                entree_info: formData.entree_info,
                entree_substitut: formData.entree_substitut,
                plat_principal: formData.plat_principal,
                plat_info: formData.plat_info,
                plat_substitut: formData.plat_substitut,
                garniture: formData.garniture,
                garniture_info: formData.garniture_info,
                laitage_ou_divers: formData.laitage_ou_divers,
                laitier_info: formData.laitier_info,
                dessert: formData.dessert,
                dessert_info: formData.dessert_info,
                pain: formData.pain
            };

            db.collection("menus")
              .replaceOne(myquery, newvalues, function (err, result) {
                  if (!err) {
                      response.baseResponse(200, "Menu updated", result, res);
                  } else {
                      response.baseResponse(500, "Error during update", err, res);
                  }
              });
        } else {
            response.baseResponse(500, "Error during database connection", null, res);
        }
    });
};

exports.deleteMenu = function (ids, req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        if (!err) {
            const myquery = {"_id": {$in: ids.map(element => ObjectId(element))}};
            db.collection("menus")
              .deleteMany(myquery, function (err, result) {
                  if (!err) {
                      response.baseResponse(200, "All elements were deleted", result, res);
                  } else {
                      response.baseResponse(500, "Error during deletion, some element may not be deleted", err, res);
                  }
              });
        } else {
            response.baseResponse(500, "Error during db connexion", null, res);
        }
    });
};
