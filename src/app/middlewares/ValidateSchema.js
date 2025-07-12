import * as Yup from 'yup';

export const companiesSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required")
    .email("Email must be a valid email address"),
  password: Yup.string().required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const addressSchema = Yup.object().shape({
  street: Yup.string().required(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required")
});

const validate = (schema) => async (req, res, next) => {
  console.log(schema)
  console.log(req.body)
  try {
    await schema.validate(req.body, { abortEarly: false });
    next(); 
    
  } catch (err) {
    if(err instanceof Yup.ValidationError){
      return res.status(400).json({type: "ValidationError", 
        message: "Validation failed", errors: err.errors
      });
    }
    next(err);
  }
};

export const validateAddress = validate(addressSchema);
export const validateCompanies = validate(companiesSchema);