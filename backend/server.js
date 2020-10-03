const express = require('express');
var Sequelize = require('sequelize');
bodyParser = require("body-parser");
cors = require("cors")
var path = require("path");
var debug = require('debug')('express-sequelize');
const {sequelize,Usuario}=require('./models/sequelizeConnection');
const server= express();
const passport = require('passport');

require('./config/passport')(Usuario,server,passport); 

server.use(cors());
server.use(bodyParser.json());
server.use(require ('./routes/routes.js'));
server.use('/', require('./routes/routesAuth')(passport,Usuario));
// server.use(require('./routes/routesHtml')(Usuario));

server.set('port',process.env.PORT ||8888);
server.get("/", (req, res) => res.send('APP UP'));



console.log("AQUI SERVER:",path.join(__dirname,`server`));

// sequelize.sync()
sequelize.sync({force:true})
.then(() => {
  server.listen(server.get('port'),()=> {
  debug(`Express listening on port ${server.get('port')}`);
  
  });
});




exports.server=server