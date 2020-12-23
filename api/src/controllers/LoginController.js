const authService = require('../services/AuthService');
const Pessoa = require('../models/Pessoa');
const { Op } = require("sequelize");

const bcrypt = require('bcryptjs');


module.exports = {
    
    async login(req, res) {

        try {

            let { user, senha } = req.body;
            if (!user || !senha){
                return res.json({ "message": "Favor preencher campos necessários." });
            }else{
                /* 
                Para gerar hash e adicionar no banco
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(senha, salt);
                console.log(hash); 
                $2a$10$BmUeZIW2n3foGHMvEiLax.OVKx/XtnjEjRk.pSa8Zy25W/pylkuCu = 1
                */

                const pessoa = await Pessoa.findOne({
                    where: {
                        [Op.or]: [{matricula: user},{documento: user, matricula: null}], 
                        data_del: null 
                    }
                });
                
                if(!pessoa){
                    return res.json({ "message": "Usuário não registrado!" }); 
                }else{

                    const valido = bcrypt.compareSync(senha, pessoa.dataValues.senha);
                    if (!valido) {
                        return res.json({ "message": "Usuário não autorizado!" });
                    }else {
                        
                        let token = await authService.generateToken({login: user});
                        res.json({
                            "message": "Autorizado!",
                            "token": token,
                            "pessoa": pessoa.dataValues
                        });
                    }
                }                 
            }
        }
        catch(e) {
            return res.json({ "message": "Erro interno!" });

        }
    }
};