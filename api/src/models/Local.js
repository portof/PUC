const { Model, DataTypes } = require('sequelize');
const TipoLocal = require('./TipoLocal');

class Local extends Model {
    static init(sequelize){
        super.init({
            nome: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            nome_detalhado: {type: DataTypes.STRING},
            cnpj: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            admin: {
                type: DataTypes.STRING(3), 
                allowNull: false
            },
            logradouro: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            numero:{
                type: DataTypes.STRING, 
                allowNull: false
            },
            complemento: {type: DataTypes.STRING},
            bairro: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            cep: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            cidade: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            uf: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            telefone: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            id_tipo_local: {
                type: DataTypes.INTEGER, 
                allowNull: false, 

            },
            data_del: {type: DataTypes.DATE}

        },{
            sequelize,
            tableName: 'local',
            freezeTableName: true,
            timestamps: false,
        })
    }

}; 
  

module.exports = Local; 