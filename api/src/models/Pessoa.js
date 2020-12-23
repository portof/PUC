const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
    static init(sequelize){
        super.init({
            nome: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            nome_detalhado: {
                type: DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            funcao: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            matricula: { type: DataTypes.STRING },
            id_especialidade: {type: DataTypes.STRING},
            documento: {
                type: DataTypes.STRING, 
                allowNull: false
            },
            data_del: {type: DataTypes.DATE}

        },{
            sequelize,
            tableName: 'pessoa',
            freezeTableName: true,
            timestamps: false,
        })
    }

}; 
  
module.exports = Pessoa; 