const sendAccessToken = (user,accessToken, statusCode, res) => {
  const options = {path:"/",httpOnly: true,sameSite: "none",secure: true,};
  return res.status(statusCode).cookie("accessToken", accessToken, options).json({user,success: true});
}
module.exports = sendAccessToken;