import { ROLE_PERMISSIONS } from "../config/roles.config.js";

 const authorizePermission = (permission) => {
  return (req, res, next) => {
   
    const userRole = req.user.role;

    const permissions = ROLE_PERMISSIONS[userRole] || [];

    if (!permissions.includes(permission)) {
      return res.status(403).json({
        message: "Permission denied"
      });
    }

    next();
  };
};
export {
    authorizePermission
}