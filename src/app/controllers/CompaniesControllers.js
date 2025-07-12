//import Companies from "../models/Companies.js";
import logger from "../../../logs/logs.js";

class CompaniesController {
    async create (req, res) {
        res.json({message: "estou funcionando"})
        logger.error("esse e um teste")
    }
}

export default new CompaniesController;





/*

import * as Yup from "yup";
import {Op} from "sequelize";   
import Companies from "../models/Companies.js"
import {parseISO } from "date-fns"; // para converter a data em ISO

class Companies {
    async index (req, res) {
        const {
            nome,
            email,
            nivel_acesso,
            status,
            createBefore,
            createAfter,
            updateBefore,
            updateAfter,
            sort,
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        let where = {};
        let order = [];
        if (nome) {
            where = {
                ...where,
                nome: {
                    [Op.iLike]: nome,
                }
            };
        }
        if (email) {
            where = {
                ...where,
                email: {
                    [Op.is]: email,
                }
            };
        }
        if (nivel_acesso) {
            where = {
                ...where,
                nivel_acesso: {
                    [Op.in]: nivel_acesso.split(",").map(item => item.toUpperCase()),
                }
            };
        }
        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()),
                }
            };
        }
        if (createBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createBefore),
                }
            };
        }
        if (createAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createAfter),
                }
            };
        }
        if (updateBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updateBefore),
                }
            };
        }
        if (updateAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updateAfter),
                }
            };
        }
        console.log("where: ", where);

        if (sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

        const data = await Admin_empresas.findAll({
            attributes: {exclude: ["password","password_hash"]},
            where,
            order,
            limit,
            offset: limit * page - limit,
        });
        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Nenhum registro encontrado." });
        }
        console.log("Parâmetros recebidos:", req.query);
        console.log("Consulta WHERE:", where);
        console.log("Dados retornados:", data);

        console.log({userId: req.userId});
        //user.findByPk(req.userId);

        return res.json(data);
    }
    // lista um usuario especifico
    async show (req, res) {

        const user = await Admin_empresas.findByPk(req.params.id,{
            attributes: {exclude: ["password","password_hash"]},
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario não encontrado." });
        }

        return res.json(user);
    }

    // cria um usuario
    async create (req, res) {
    // para usar o Yup, é necessário instalar o pacote para fazer a validação defino o tipo de dado e retorno com req.   
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
            nivel_acesso: Yup.string().required(),
            status: Yup.string().required(),
            passwordconfirm: Yup.string().when("password", (password, field) => 
            password ? field.required().oneOf([Yup.ref("password")]) : field
            ),
        });
        console.log("Parâmetros recebidos:", req.body);

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({ error: "Erro de validação." });
        };

        const {id, nome, email, createAfter, updateAfter} = await Admin_empresas.create(req.body);

        return res.status(201).json({id, nome, email, createAfter, updateAfter});
        
    }
    // atualiza um usuario
    async update (req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            oldpassword: Yup.string().min(8),
            password: Yup.string().min(8).when("oldpassword", (oldpassword, field) =>
                oldpassword ? field.required() : field ),

            passwordconfirm: Yup.string().when("password", (password, field) => 
                password ? field.required().oneOf([Yup.ref("password")]) : field
            ),

            nivel_acesso: Yup.string(),
            status: Yup.string(),
        });

        console.log("Parâmetros recebidos:", req.body);

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validação falhou" });
        }

        const user = await Admin_empresas.findByPk(req.params.id);
        if (!user) {
            return res.status(400).json({ error: "Usuario não encontrada" });
        }

        const { oldpassword } = req.body;
        if (oldpassword && !(await user.checkPassword(oldpassword))) {
            return res.status(401).json({ error: "Senha antiga não confere." });
        }

        const {id, nome, email, createAfter, updateAfter} = await user.update(req.body);

        return res.json({id, nome, email, createAfter, updateAfter});
    }   

    // deleta um usuario
    async destroy (req, res) {
        const user = await Admin_empresas.findByPk(req.params.id);
        
        if(!user) {
            return res.status(404).json();
        }
        await user.destroy();

        return res.json({mensage: "Usuario deletado com sucesso."});
    }
}

export default new user();
*/