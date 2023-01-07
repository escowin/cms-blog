const path = require('path');
const routes = require('./controllers');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// server | runs the server & listens through the port
const app = express();
const PORT = process.env.PORT || 3001;

// orm | connects to & auto stores sessions in db
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// session | property information
const sess = {
    secret: 'the secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};

// middle ware | expression session
app.use(session(sess));

// tells the server to use the handlebars template engine
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware | express | faciliates front & backend data communication; setting the public folder contents to static allows views to load frontend javascript & css.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on database and server connection
// - force: true | DROP DATABASE IF EXISTS tech_blog_db;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// ** pause | server set up **