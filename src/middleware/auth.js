const ErrorHandler = require("~/utils/ErrorHandle");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    try {
        const {accessToken} = req.cookies;
        if(!accessToken){return next(new ErrorHandler("Please login to continue", 401))}
        const verifyUser = jwt.verify(accessToken, process.env.JWT_ACCESSTK_SECRET);
        req.user = verifyUser.sub
        next();
    } catch (error) {

        return next(new ErrorHandler('jwt expired', 401))
    }
});
// exports.isAuthenticatedSeller = catchAsyncErrors(async(req,res,next) => {
//     const {accessToken} = req.cookies;
//     if(!accessToken){return next(new ErrorHandler("Please login to continue", 401))}
//     try {
//         const verifyUser = jwt.verify(accessToken, process.env.JWT_ACCESSTK_SECRET);
//         req.seller = verifyUser.sub
//         next();
//     } catch (error) {
//         // return next(new ErrorHandler("jwt111 exprired", 401))
//         res.cookie('accessToken',null,{
//             expires:new Date(Date.now()),
//             path:"/",httpOnly: true,sameSite: "none",secure: true
//           })
//           res.status(201).json({
//             success:true,
//             message:"jwt111 exprired"
//           })
//     }
// });



