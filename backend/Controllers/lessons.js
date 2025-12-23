const { pool } = require("../Models/db")

const createlessons=(req,res)=>{
const { title , video , course } = req.body;

  pool
    .query(
      `INSERT INTO lessons (title , video , course)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title , video , course]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Lesson created successfully",
        result: result.rows,
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

const getAlllessons=(req,res)=>{
 pool
    .query(
      "SELECT * FROM lessons"
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All lessons",
        articles: result.rows,
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

const getlessonsById=(req,res)=>{
const {id}=req.params

pool.query(`SELECT * FROM users WHERE id`)
.then((result) => {
      res.status(200).json({
        success: true,
        message: `get lessons By Id: ${id} successfully`,
        articles: result.rows,
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


const deletelessonsById=(req,res)=>{
const {id}=req.params

pool.query(`DELETE FROM users WHERE id `)
.then((result) => {
      res.status(200).json({
        success: true,
        message: `Delete lessons By Id: ${id} successfully`,
        articles: result.rows,
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


const updatelessonsById=(req,res)=>{

}



// DELETE FROM users WHERE user_id 


module.exports= {
createlessons,getAlllessons,getlessonsById,deletelessonsById
}