import logger from "../../../logs/logs.js";
import Suppliers from "../models/Supplier.js";

class SupplierController {
  async create (req, res) {
		const {cnpj } = req.body;

		try {		
			const result = await Suppliers.findOne({
				where: {
					cnpj: cnpj 
						}
					});
				console.log(typeof result)
			if(result) {

				return res.json({message: "Supplier alredy registred"});
				
			}else {	
				const newSupplier = await Suppliers.create(req.body);

				return res.status(201).json({ message: "Supplier created successfully", newSupplier }); 
			}
		
			}catch(err){	
				console.error("erro na validação", err)
				res.status(500).json({message: "error in create", error: err.message})
				logger.error("validate error", err)
		}
	}
}

export default new SupplierController; 