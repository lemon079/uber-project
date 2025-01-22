import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import BlackListToken from "../models/blackListToken.model.js";
import Captain from "../models/captain.model.js";

export async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlackListed = await BlackListToken.findOne({ token: token });

  if (isBlackListed) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

export async function authCaptain(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const isBlackListed = await BlackListToken.findOne({ token: token });

  if (isBlackListed) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    req.captain = captain;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}
