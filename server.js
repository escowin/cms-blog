const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');
const session = require("express-session");
const hbs = exphbs.create({});
const routes = require('./controllers/');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));