const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");

const MONGODB_URI = "mongodb+srv://Hackathon:SwftqllgGvzOsGIl@cluster0.bkmjj.mongodb.net/users"

const MongoDbStore = require("connect-mongodb-session")(session);

const storeSesssion = new MongoDbStore({
  url: MONGODB_URI,
  collection: 'session'
})


app.set('view engine', 'ejs');
app.set('views', 'backend/views');

const functionalRoutes = require('./routes/functionalRoutes');
const mainRoutes = require('./routes/mainRoutes');


app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'sdasdsadasdsaddhkgnkdnfv cx,.dfpfsdkfpok%*((',
  resave: false,
  saveUninitialized: false,
  store: storeSesssion
}))

// Application routes 
app.use(mainRoutes);
app.use('/api', functionalRoutes);


module.exports = app;

