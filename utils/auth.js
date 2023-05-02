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
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return decoded;
    } catch (error) {
      console.error("Token is not valid");
    }
  } else {
    console.error("Authorization header not found");
  }
  return null;
};


export { signToken, isAuth };