const sendCheckedProductsToken = (checkedProducts,checkedProductsToken, statusCode, res) => {
  const options = {path:"/",httpOnly: true,sameSite: "none",secure: true,};
  return res.status(statusCode).cookie("checkedProductsToken", checkedProductsToken, options).json({checkedProducts,success: true});
}
module.exports = sendCheckedProductsToken;