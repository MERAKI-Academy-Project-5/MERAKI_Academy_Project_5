const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../models/db");
const register = async (req, res) => {
  const { firstName, lastName, role, age, email, password, image } = req.body;
  const hashpassowrd = await bcrypt.hash(password, 10);
  pool
    .query(
      `INSERT INTO users (firstName,lastName,role,age,email,password,image) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [firstName, lastName, role, age, email, hashpassowrd, image]
    )
    .then((result) => {
      console.log(result);
      res.status(201).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err: err,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  pool
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(403).json({
          success: false,
          massage:
            "The email doesn’t exist or the password you’ve entered is incorrect",
        });
      }
      const user = result.rows[0];
      return bcrypt.compare(password, user.password).then((isPassword) => {
        if (!isPassword) {
          return res.status(403).json({
            success: false,
          });
        }
        const payload = {
          userId: user.id,
          role: user.role_id,
        };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: "1d",
        });
        res.status(200).json({
          success: true,
          massage: "Valid login credentials",
          token: token,
          userId: user.id,
          role:user.role
          
        });
        
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
};

const getAllUsers = (req, res) => {
  const userId = req.token.userId;
  pool
    .query(`SELECT * FROM users`)
    .then((result) => {
      if (result.rows.length) {
        res.status(200).json({
          success: true,
          message: `All the users`,
          adminId: userId,
          users: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `No Users Yet`,
        });
      }
    })
    .catch((err) => {});
};
const updateUserById = async (req, res) => {
  const { userId } = req.parms;
  const { firstName, lastName, age, password, image } = req.body;
  const hashpassowrd = await bcrypt.hash(password, 10);
  pool
    .query(
      `UPDATE users SET firstName = COALESCE($1,firstName) , lastName = COALESCE($2,lastName) , age = COALESCE($3,age) , password = COALESCE($4,password) , image =COALESCE($5,image) WHERE userId = $6 `,
      [firstName, lastName, age, hashpassowrd, image, userId]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `user updated`,
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
const getUserById = (req, res) => {
  console.log("no");

  id = req.params.id;
  pool
    .query(`SELECT * FROM users WHERE id =$1`, [id])
    .then((result) => {
      console.log(result);

      res.status(200).json({
        success: true,
        user: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const deleteUserById = (req, res) => {
  const { id } = req.params;
   pool
    .query(`DELETE FROM courses WHERE instructorid = $1 `, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Delete courses By Id: ${id} successfully`,
        courses: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
  pool
    .query(`DELETE  FROM users WHERE id = $1 `, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Delete users By Id: ${id} successfully`,
        user: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getInstructorIdByCourseTitle = (res , req)=>{
  const { title } = req.params;
  let id ;
  pool
    .query(`SELECT * FROM courses WHERE title =$1`, [title])
    .then((result) => {
      id = result.rows[0].instructorid
      console.log(result);
      res.status(200).json({
        success: true,
        course: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
     pool
    .query(`SELECT * FROM users WHERE id =$1`, [id])
    .then((result) => {
      res.status(200).json({
        success: true,
        user: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
}

module.exports = {
  register,
  login,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserById,
  getInstructorIdByCourseTitle
};
