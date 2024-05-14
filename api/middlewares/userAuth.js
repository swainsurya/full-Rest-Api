import jwt from "jsonwebtoken";

let checking = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        let verify = jwt.verify(token,"My Jwt token") ;
        next();
    } catch (error) {
        return res.status(401).json({
            msg : "Invalid token"
        })
    }
}

export default checking;