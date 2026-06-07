const jwt = require("jsonwebtoken");

// This middleware checks if the user has a valid JWT token
const protect = (req, res, next) => {
  // Get token from the Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided. Please login." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to the request
    next(); // Move to the next function
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
};

module.exports = protect;
