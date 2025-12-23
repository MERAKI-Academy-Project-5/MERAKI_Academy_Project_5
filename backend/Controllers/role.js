const { pool } = require("../models/db");




const createNewRole = (req, res) => {
  const { role } = req.body;
  pool.query(`INSERT INTO roles (role) VALUES ($1) RETURNING * ` , [role])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role created`,
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updateRoleById = (req, res) => {
    const {roleId} =  req.parms;
    const { newRole } = req.body;
  pool.query(`UPDATE roles SET role = $1 WHERE role_id = $2 ` , [newRole , roleId])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role created`,
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const createNewPermissions = (req, res) => {
  const { permission } = req.body;
  pool.query(`INSERT INTO permissions (permission) VALUES ($1) RETURNING * ` , [permission])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `permissions are created`,
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
}
const updatePermissionByRole = (req, res) => {
    const {permissionId} =  req.parms;
    const { permission } = req.body;
  pool.query(`UPDATE permissions SET role = $1 WHERE permission_id = $2 ` , [permission , permissionId])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Role created`,
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


module.exports = { createNewRole, updateRoleById ,createNewPermissions , updatePermissionByRole };
