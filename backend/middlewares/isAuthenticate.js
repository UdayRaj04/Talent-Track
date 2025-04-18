// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) {
//             return res.status(401).json({
//                 message: "User not able to authenticated",
//                 success: false,
//             })
//         }
//         const decode = await jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(401).json({
//                 message:"Invalid token",
//                 success:false
//             })
//         };
//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.log(error);
//     }
// }
// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);  // Debugging
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false
                });
            }
            req.id = decoded.userId;
            next();
        });

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export default isAuthenticated;
