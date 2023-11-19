
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
let verifyAccessToken = async(req,res)=>{
  if(!req.cookies.accessToken) return
  const accessToken = req.cookies.accessToken
  const user =await jwt.verify(accessToken, process.env.JWT_SECRET)

  res.json(user.sub)
}

module.exports={verifyAccessToken}