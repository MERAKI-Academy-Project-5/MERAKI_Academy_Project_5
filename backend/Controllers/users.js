const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName,role, age,  email, password , image } =
    req.body;
  const hashpassowrd = await bcrypt.hash(password, 10);
  pool
    .query(
      `INSERT INTO users (firstName,lastName,role,age,email,password,image) VALUES ($1,$2,$3,$4,$5,$6)`,
      [firstName, lastName, role,age, email, hashpassowrd,image]
    )
    .then((result) => {
      req.status(201).json({
        success: true,
        message: "Account created successfully",
      });
    })
    .catch((err) => {
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
    .query(`SELECT email, password FROM users`)
    .then(async (result) => {
      console.log(result.rows);
      if (!result.rows) {
        res.status(404).json("email not found");
      } else {
        const isCorrectPassword = await bcrypt.compare(
          password,
          result.password
        );
        console.log(isCorrectPassword);
        if (!isCorrectPassword) {
          res.status(403).json({
            success: false,
            massage:
              "The email doesn’t exist or the password you’ve entered is incorrect",
          });
        } else {
          const payload = {
            userId: result.id,
            country: result.country,
            role: result.role,
          };
          const options = {
            expiresIn: "60m",
          };
          const userToken = jwt.sign(payload, process.env.SECRET, options);
          res.status(200).json({
            success: true,
            massage: "Valid login credentials",
            token: token,
            userId: result.id,
          });
        }
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

const getAllUsers = (req, res) => {
  // ask nazzal
const userId = req.token.userId;
 pool.query(`SELECT * FROM users`)
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: `All the users`,
          adminId: userId,
          articles: articles,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No Users Yet`,
        });
      }
    })
    .catch((err) => {});
}
;const updateUserById = async(req, res) => {
    const {userId} =  req.parms;
    const { firstName,lastName,age,password, image } = req.body;
    const hashpassowrd = await bcrypt.hash(password, 10);
  pool.query(`UPDATE roles SET firstName = $1 WHERE role_id = $2 ` , [newRole , roleId])
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

module.exports = {
  register,
  login,
  getAllUsers
};
