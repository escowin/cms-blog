const path = require('path');

const express =  require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection'); // orm db connection

const app = express();
const PORT = process.env.PORT || 3001;

// express | built-in middleware
app.use(express.json());

// turn on routes
app.use(routes);

// turn on database and server connection
// - force true | DROP DATABASE IF EXISTS tech_blog_db;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

// ** pause | server set up **