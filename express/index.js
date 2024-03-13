import express from "express";
import path from "path";
import { connectDB, User } from "./db/index.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const app = express();
// database
connectDB();
const PORT = process.env.PORT;

// setting up view engine
app.set("view engine", "ejs");

// serving html file
// one way it will give error
// express.static(path.join(path.resolve(), 'public'))

// middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// authintication
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "fskfwfnkkfsjkfsk")
    req.user = await User.findById(decoded._id)
    // console.log(decoded);
    next()
  } else {
    res.redirect("/login")
  }
};


app.get("/", isAuthenticated, (req, res) => {

  res.render("logout", { name: req.user.name })
});

app.get("/login", isAuthenticated, (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
});

// register auth

app.post("/register", async (req, res) => {

  const { name, email, password } = req.body
  const hashPassword = bcrypt.hash(password, 10)
  let user = await User.findOne({ email })
  if (user) {
    res.redirect("/login")
  }

  else {
    user = await User.create({
      name,
      email,
      password: hashPassword
    })

    const token = jwt.sign({ _id: user._id }, "fskfwfnkkfsjkfsk",)
    // console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");
  }
});

// login auth

app.post("/login", async (req, res) => {
  const { email, password } = req.body
  let user = await User.findOne({ email })
  if (!user) {
    res.redirect("/register")
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    res.render("login", { message: "Incorrect Password" })
  }
  else {
    const token = jwt.sign({ _id: user._id }, "fskfwfnkkfsjkfsk",)
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
    });
    res.redirect("/");

  }
})

// logout auth

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/register");
});





app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
