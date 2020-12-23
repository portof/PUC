const Sequelize = require('sequelize');

const config = require('../config.json');
const Local = require('../models/Local');
const TipoLocal = require('../models/TipoLocal');
const Pessoa = require('../models/Pessoa');

const connection = new Sequelize(config.banco);

Local.init(connection);
TipoLocal.init(connection); 
Pessoa.init(connection); 


Local.hasOne(TipoLocal, {foreignKey: "id",  sourceKey: "id_tipo_local"});


module.exports = connection;