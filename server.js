const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = "supersecret";

const FLAG = process.env.FLAG || "FLAG{dummy_flag_for_dev}";

// Main guest page
app.get("/", (req, res) => {
  if (!req.cookies["jwt-role"]) {
    const cookie_token = jwt.sign(
    {
      username: "guest",
      role: "guest"
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

    res.cookie("jwt-role", cookie_token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 3600 * 1000
    });
  }

  res.sendFile(__dirname + "/public/index.html");
});

app.get("/admin", (req, res) => {
  const token = req.cookies["jwt-role"];
  if (!token) {
    return res.status(401).send("Unauthorized - no token");
  }

  try {
    const payload = jwt.verify(token,JWT_SECRET);

    if (!payload) {
      return res.status(401).send("Invalid token format");
    }

    if (payload.role === "admin") {
      res.send(`
        <h1>Admin Panel</h1>
        <p>Welcome ADMIN</p>
        <p><strong>Flag:</strong> ${FLAG}</p>
      `);
    } else {
      res.status(403).send("Access denied: admin only");
    }
  } catch (err) {
    res.status(401).send("Unauthorized - invalid token");
  }
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("JWT challenge running on http://localhost:${PORT}");
});
