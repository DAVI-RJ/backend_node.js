import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authConfig from '../../config/authconfig.js';
import Admin_empresas from '../models/Admin_empresas.js';

class AuthController {
  async create(req, res) {
    const { email, password, nome } = req.body;
    
    let user = await Admin_empresas.findOne({ where: { email} });

      // Se o usuário não existir, cria um novo
        if (!user) {
            const password_hash = await bcrypt.hash(password, 8);
            user = await Admin_empresas.create({
              nome,
              email,
              password_hash,
              nivel_acesso: "suporte",
              status: "ativo",
          });
          return res.status(201).json({ message: 'User created successfully', user }); 
      }
      // Se o usuário existir, verifica se a senha está correta
    if((await user.checkPassword(password))){
        return res.status(401).json({error: 'Password does not match'});
        }
        const {id} = user;

        const token = jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        });


        return res.status(200).json({user: { id, nome, email },token,});
    } 
}

export default new AuthController();