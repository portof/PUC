const moment = require('moment');

const Local = require('../models/Local');
const TipoLocal = require('../models/TipoLocal');



module.exports = {

    async index(req, res){
        const { id } = req.body;
       
        if(!id){

            const locals = await Local.findAll({
                where: { data_del: null },
                include: { model: TipoLocal },
                order: ['id']
            });
            
            return res.json(locals);
        }else{
            const locals = await Local.findByPk(id);
            if(locals != null){
                return res.json(locals);
            }else{
                return res.json({"message": "Algo deu errado! Local não encontrado!"});
            }
        }  
    },

    
    async store(req,res){
        const { nome, nome_detalhado, cnpj, admin, logradouro, numero, complemento, bairro, cep, cidade, uf, telefone, id_tipo_local } = req.body;

        try {
            if(!nome || !cnpj || !admin || !logradouro || !numero || !bairro || !cep || !cidade || !uf || !telefone || !id_tipo_local){
                return res.json({"message": "Algo deu errado! Favor preencher campos necessários."});
            }else{
                const local = await Local.create({
                    nome,
                    nome_detalhado,
                    cnpj, 
                    admin, 
                    logradouro, 
                    numero, 
                    complemento, 
                    bairro, 
                    cep, 
                    cidade, 
                    uf, 
                    telefone, 
                    id_tipo_local
                })
                return res.json({local});   
        }

        } catch (e) {
            return res.json({ "message": "Erro interno!" });
        }

        

    },                   

    async update(req,res){
        const id = req.params.id;
        const { nome, nome_detalhado, cnpj, admin, logradouro, numero, complemento, bairro, cep, cidade, uf, telefone, id_tipo_local } = req.body;

        try {
            if(!nome || !cnpj || !admin || !logradouro || !numero || !bairro || !cep || !cidade || !uf || !telefone || !id_tipo_local){
                return res.json({
                    "message": "Algo deu errado! Favor preencher campos necessários.",
                    "erro": true    });
            }else{
               await Local.update({nome, nome_detalhado, cnpj, admin, logradouro, numero, complemento, bairro, cep, cidade, uf, telefone, id_tipo_local}, {
                    where: {
                         id
                    }
                    });    
                    return res.json({
                        "message": "Alterado com sucesso!",
                    });  
                
            }
        }
        catch (e) {
            return res.json(e);
            
        }
        
    },

    async delete(req,res){
        const id = req.params.id;
        const data_del = moment().format('YYYY-MM-DD HH:mm:ss[Z]');

        try {
            const exists = await Local.findByPk(id);

            if(!exists){
                return res.json({                    
                    "message": "Local não encontrado!",
            });
            }else{
                /* await exists.destroy(); */
                await Local.update({data_del}, {
                    where: {
                         id
                    }
                    });
                return res.json({                    
                    "message": "Deletado com sucesso!",
                });
            }
        }
        catch (e) {
            return res.json({ "message": "Erro interno!" });
            
        }
        
    }
};