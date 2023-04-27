import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const isAuth = async (req, res) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // BEARER XXX
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded;
    } else {
      res.status(401).send({ message: 'Token is not valid' });
    }
  } else {
    return null
  }
};
export { signToken, isAuth };