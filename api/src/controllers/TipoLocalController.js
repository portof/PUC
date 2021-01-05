const moment = require('moment');

const TipoLocal = require('../models/TipoLocal');
const Local = require('../models/Local');


module.exports = {

    async index(req, res){
        const id = req.params.id;
        if(!id){
            const tipos_local = await TipoLocal.findAll(
                {
                where: { data_del: null },
                order: ['id']
            });
            return res.json(tipos_local);
        }else{
            const tipos_local = await TipoLocal.findByPk(id);
            const local = await Local.findOne({ where: { id_tipo_local: id } });
            if(tipos_local != null){
                return res.json([tipos_local, local]);
            }else{
                return res.json({
                    "message": "Tipo não encontrado!",
                    "farmacia": false
                
                });
            }
        }  
    },

    async store(req,res){
        const { descricao, farmacia } = req.body;
        
        try {
            const exists = await TipoLocal.findOne({ where: { farmacia: true, data_del: null } });            
            
            if(!descricao){
                return res.json({
                    "message": "Descrição não pode ser vazia.",
                    "farmacia": false,
                
                });
            }
            else if(exists && farmacia === true){
                return res.json({
                    "message": "Tipo Farmácia já cadastrado.",
                    "farmacia": true,
                
                });
            }else{
                const tipo_local = await TipoLocal.create({
                    descricao,
                    farmacia
                })
                return res.json({tipo_local});  

            }
        } 
        catch (e) {
            return res.json({ "message": "Erro interno!" });
            
        }
        
    },

    async update(req,res){
        const id = req.params.id;
        const { descricao, farmacia } = req.body;
        const local = await Local.findOne({ where: { id_tipo_local: id } });

        try {
            if(!local){
                const exists = await TipoLocal.findOne({ where: { farmacia: true, data_del: null } });

                if(!descricao){
                    return res.json({
                        "message": "Descrição não pode ser vazia.",
                        "farmacia": false,
                    });
                }
                else if(farmacia == true && exists != null){
                    return res.json({
                        "message": "Tipo Farmácia já cadastrado.",
                        "farmacia": true,
                    });
                }else{
                    await TipoLocal.update({descricao, farmacia}, {
                    where: {
                         id
                    }
                    });
                    return res.json({                    
                        "message": "Alterado com sucesso!",
                    }); 
                }
            }else{
                return res.json({
                    "message": "Tipo possui local vinculado!",
                    "local": local.nome
                });
            }          
        } 
        catch (e) {
            return res.json({ "message": "Erro interno!" });
            
        }
        
    },
    
    async delete(req,res){
        const id = req.params.id;
        const data_del = moment().format('YYYY-MM-DD HH:mm:ss[Z]');

        try {
            const exists = await TipoLocal.findByPk(id);
            
            const local = await Local.findOne({ 
                where: { 
                    id_tipo_local: id,
                    data_del: null 
                } });

            if(!exists){
                return res.json({                    
                    "message": "Tipo não encontrado!",
            });
            }else if(!local){
                /* await exists.destroy(); */
                await TipoLocal.update({data_del}, {
                    where: {
                         id
                    }
                    });
                return res.json({                    
                    "message": "Deletado com sucesso!",
                });
            }else{
                return res.json(local);
            }
        }
        catch (e) {
            return res.json({ "message": "Erro interno!" });
            
        }
    },

    

}; 