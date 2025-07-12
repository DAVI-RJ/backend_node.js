import Address from "../models/Address.js"; 

class AddressController {
  async create (req, res) {
    try {
      const newAddress = await Address.create(req.body);
      res.status(201).json(newAddress); 
    }catch (err){
      console.log(err);
    }
  }
}
export default new AddressController; 