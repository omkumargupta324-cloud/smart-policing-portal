const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Look for the security token in the request headers
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // 2. The token usually looks like "Bearer eyJhbG...", so we split it to get just the token
    const token = authHeader.split(' ')[1] || authHeader;
    
    // 3. Verify the token using our secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user's ID and Role to the request so the next functions can use it
    req.user = verified;
    
    // 5. Let the user pass through to their destination
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { verifyToken };