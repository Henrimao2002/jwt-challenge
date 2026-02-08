const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// ⚠️ Secret exists but is never actually used correctly
const JWT_SECRET = "super-secret-key";

// Fake flag (server-side only)
const FLAG = "FLAG{jwt_privilege_escalation_success}";

// Issue a guest token
app.get("/login", (req, res) => {
  const token = jwt.sign(
    {
      username: "guest",
      role: "guest"
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Logged in as guest",
    token
  });
});

// Middleware (INTENTIONALLY BROKEN)
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  // ❌ VULNERABILITY:
  // Token is decoded but NEVER verified
  const decoded = jwt.decode(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = decoded;
  next();
}

// Admin-only endpoint
app.get("/admin", authenticate, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  res.json({
    message: "Welcome admin",
    flag: FLAG
  });
});

app.listen(3000, () => {
  console.log("JWT challenge running on http://localhost:3000");
});
