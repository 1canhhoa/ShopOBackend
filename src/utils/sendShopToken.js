const sendShopToken = (shop,shoptoken, statusCode, res) => {
  const options = {path:"/",httpOnly: true,sameSite: "none",secure: true,};
  res.status(statusCode).cookie("shopToken", shoptoken, options).json({shop,success: true});
}
module.exports = sendShopToken;
