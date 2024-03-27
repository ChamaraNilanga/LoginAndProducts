const { sign, verify } = require("jsonwebtoken");

exports.createToken = (id,role) => {
  const accessToken = sign(
    { id: id, role: role},
    process.env.SECRET_KEY
  );
  return accessToken;
};

exports.decodeJWT = async (req, res) => {
  const authtoken = req.headers.authorization;
  const token = authtoken?.replace("Bearer ", "") || req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return res.status(400).json({ message: "Missing token" });
  }

  const verifyPromise = () => {
    return new Promise((resolve, reject) => {
      verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    });
  };

  try {
    const decoded = await verifyPromise();
    return decoded;
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

exports.validateToken = (req, res, next) => {
  const authtoken = req.headers.authorization;
  const accessToken =
    authtoken?.replace("Bearer ", "") || req.cookies.accessToken;

  if (accessToken) {
    verify(accessToken, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(400).json({ message: "Access denied!", status: false });
      } else {
        req.user = true;
        next();
      }
    });
  } else {
    res.status(400).json({ message: " User Access required", status: false });
  }
};

exports.ValidateAdmin = async (req, res, next) => {
  const authToken = req.headers.authorization || req.headers.bearerauth;
  console.log(authToken);
  if (!authToken) {
    res
      .status(401)
      .json({ status: false, message: "Admin access required" });
    return;
  }

  const accessToken = authToken.replace("Bearer ", "");

  verify(accessToken, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      res.status(401).json({ status: false, message: error.message });
      return;
    }

    if (decoded.role !== "ADMIN") {
      res.status(403).json({ status: false, message: "Access denied!" });
      return;
    }

    next();
  });
};
