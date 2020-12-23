const { Model, DataTypes } = require('sequelize');


class TipoLocal extends Model {
    static init(sequelize){
        super.init({
            /* id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true  }, */
            descricao: {type: DataTypes.STRING, allowNull: false},
            farmacia: {type: DataTypes.BOOLEAN},
            data_del: {type: DataTypes.DATE}

        },{
            sequelize,
            tableName: 'tipo_local',
            freezeTableName: true,
            timestamps: false
        })
    }  

        
}



module.exports = TipoLocal;