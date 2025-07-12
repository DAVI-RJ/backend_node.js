import {Router} from "express";
import { validateAddress } from "./app/middlewares/ValidateSchema.js"

import CompaniesController from "./app/controllers/CompaniesControllers.js";
import AddressController from "./app/controllers/AddressControllers.js"

const routes = new Router();

routes.get("/", (req, res) => {
  res.json({message: "hello"})
});

routes.post("/address", validateAddress, AddressController.create);

routes.get("/companies", CompaniesController.create); 

export default routes;