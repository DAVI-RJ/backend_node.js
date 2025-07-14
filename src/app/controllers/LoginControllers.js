import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import logger from '../../../logs/logs.js';
import authConfig from '../../config/authconfig.js';
import Companies from '../models/Companies.js';

class LoginController {
  async show (req, res) {
    const { email, password} = req.body;

    console.log(req.body); 

    try {
      const result = await Companies.findAll({
        where: {
          email: email
        }
      });
      console.log(result);
      if (result && result.length > 0) {
        const company = result[0];
        const passwordMatch = await bcrypt.compare(password, company.password);

        if (passwordMatch) {
        const token = jwt.sign({ id: company.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn});

        res.json(token);
        

        } else {
          return res.status(401).json({ message: "incorrect password." }); 
        }
      }
      else {
        return res.status(404).json({ message: "no records found." });
      }
    }catch(err){
      res.status(404).json({message: "validate data", error : err});
      logger.info(err);
    }
  }
}
export default new LoginController();