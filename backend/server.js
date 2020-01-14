const express = require('express');
const app = express();
const port = process.env.PORT || 8989;
const server = require('http').Server(app);
// pour les formulaires multiparts
const multer = require('multer');
const multerData = multer();

// Import des controlleurs
const userController = require("./app_modules/user");
const restaurantController = require("./app_modules/restaurant");
const menuController = require("./app_modules/menu");
const dessertController = require("./app_modules/desserts");
const platsController = require("./app_modules/plats");
const entreesController = require("./app_modules/entrees");

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

server.listen(port);
console.log("Serveur lancé sur le port : " + port);

app.post('/api/connection', function (req, res) {
    userController.connexion(req, res);
});

app.post('/api/creationcompte', function (req, res) {
    userController.creationCompte(req, res);
});

app.get('/api/user/:username', function (req, res) {
    userController.getByUsername(req, res);
});

app.post('/api/order/', function (req, res) {
    userController.order(req.body, req, res);
});

app.get('/api/restaurants/count', function (req, res) {
    let name = req.query.name || '';
    restaurantController.countRestaurants(name, req, res)
});

app.get('/api/restaurants', function (req, res) {
    const page = parseInt(req.query.page || 1);
    const pagesize = parseInt(req.query.pagesize || 10);

    const name = req.query.name || '';

    restaurantController.findRestaurants(page, pagesize, name, req, res);
});

app.post('/api/restaurants', multerData.fields([]), function (req, res) {
    const ids = req.body.ids;
    restaurantController.findRestaurantById(ids, req, res);

});

// Creation d'un restaurant
app.post('/api/restaurants/create', function (req, res) {
    restaurantController.createRestaurant(req.body, req, res);
});

// Modification d'un restaurant, on fera l'update par
// une requête http PUT, c'est le standard REST
app.put('/api/restaurants/:id', multerData.fields([]), function (req, res) {
    const id = req.params.id;

    restaurantController.updateRestaurant(id, req.body, function (data) {
        res.send(JSON.stringify(data));
    });
});

// Suppression d'un restaurant
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/restaurants/:id', function (req, res) {
    const id = req.params.id;

    restaurantController.deleteRestaurant(id, function (data) {
        res.send(JSON.stringify(data));
    });
});

// Get all menus
app.get('/api/nourriture/menus', function (req, res) {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.id || '';

    menuController.findMenus(page, pagesize, name, req, res);
});

// Get menus by id(s)
app.post('/api/nourriture/menus', multerData.fields([]), function (req, res) {
    const ids = req.body.ids;
    menuController.findMenuById(ids, req, res);
});

// Modify menu for a given id
app.put('/api/nourriture/menus/:id', multerData.fields([]), function (req, res) {
    menuController.updateMenu(req.params.id, req.body, req, res);
});

// Delete menu(s)
app.delete('/api/nourriture/menus/',  multerData.fields([]), function (req, res) {
    menuController.deleteMenu(req.body.ids, req, res);
});




// Get all desserts
app.get('/api/nourriture/desserts', function (req, res) {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.id || '';

    dessertController.findDesserts(page, pagesize, name, req, res);
});

// Get desserts by id(s)
app.post('/api/nourriture/desserts', multerData.fields([]), function (req, res) {
    const ids = req.body.ids;
    dessertController.findDessertsById(ids, req, res);
});

// Get all plats
app.get('/api/nourriture/plats', function (req, res) {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.id || '';

    platsController.findPlats(page, pagesize, name, req, res);
});

// Get plats by id(s)
app.post('/api/nourriture/plats', multerData.fields([]), function (req, res) {
    const ids = req.body.ids;
    platsController.findPlatsById(ids, req, res);
});

// Get all entree
app.get('/api/nourriture/entrees', function (req, res) {
    let page = parseInt(req.query.page || 1);
    let pagesize = parseInt(req.query.pagesize || 10);

    let name = req.query.id || '';

    entreesController.findEntree(page, pagesize, name, req, res);
});

// Get entree by id(s)
app.post('/api/nourriture/entrees', multerData.fields([]), function (req, res) {
    const ids = req.body.ids;
    entreesController.findEntreeById(ids, req, res);
});



app.get('/api/testinsert', function (req, res) {
    mongoDBModule.insertImageFirstTime(function (data) {
        res.send(JSON.stringify(data))
    })
});

