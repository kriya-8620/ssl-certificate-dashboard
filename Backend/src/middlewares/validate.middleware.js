import ApiError from "../utils/ApiError.js"
const validate = (schema, property = "body") => {
    
  return (req, res, next) => {
    
    const { error } = schema.validate(req[property]);
    
    
     
    if (error) {
                   
                return next(new ApiError(400, error.details[0].message));
    }
   
    next();
  };
};

export {
    validate,
}