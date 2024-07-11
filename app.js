const express = require("express");
const connectToDb = require("./database/databaseConnect");
const Blog = require("./model/blogmodel");
const User = require("./model/usermodel");
const bcrypt = require("bcrypt");

const app = express();

// const multer=require("./middleware/multerConfig").multer
// const storage=require("./middleware/multerConfig").storage
const { multer, storage } = require("./middleware/multerConfig");
const upload = multer({
  storage,
});
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/about", (req, res) => {
  const name = "Manish Basnet";
  // console.log(req)
  res.render("about.ejs", { name });
});
app.get("/contact", (req, res) => {
  age = 20;
  // res.send("Hello World <h1>contact</h1>")
  res.render("contact.ejs", { age });
});

app.get("/createblog", (req, res) => {
  res.render("createBlog.ejs");
});
app.get("/showblog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  console.log(blog);
  res.render("showblog.ejs", { objblog: blog });
});
app.get("/deleteblog/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);

  res.redirect("/blog");
});

app.get("/editblog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  res.render("editblog.ejs", { objblog: blog });
});

app.post("/editblog/:id", async (req, res) => {
  const id = req.params.id;
  const { title, subtitle, description } = req.body;
  await Blog.findByIdAndUpdate(id, {
    title: title,
    subtitle: subtitle,
    description: description,
  });
  res.redirect("/blog");
});

app.get("/blog", async (req, res) => {
  const blogs = await Blog.find();

  if (blogs.length === 0) {
    res.send("No blogs found");
  }
  console.log(blogs);
  res.render("blog.ejs", { blogs });
});

app.post("/createblog", upload.single("image"), async (req, res) => {
  // const title=req.body.title
  // const subtitle=req.body.subtitle
  // const description=req.body.description
  const { title, subtitle, description, image } = req.body;
  console.log(title, subtitle, description);
  // const file = req.file;
  // console.log(req.file.filename);
  const fileName = req.file.filename;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description,
    image: fileName, //can write this if both names are same
  });

  res.send("Blog successfully created");
});

app.get("/loginpage", (req, res) => {
  res.render("loginpage.ejs");
});

app.post("/loginpage", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email: email });
  if (userData) {
    if (bcrypt.compareSync(password, userData.password)) {
      res.redirect("/blog");
    } else {
      res.send("Password is incorrect");
    }
  } else {
    res.send("User not found");
  }
});

app.get("/signuppage", (req, res) => {
  res.render("signuppage.ejs");
});
app.post("/signuppage", async (req, res) => {
  const { username, email, password } = req.body;
  await User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 10),
  });
  res.redirect("/loginpage");
});
app.use(express.static("./storage"));

app.listen(3000, () => {
  console.log("Node.js project started at port " + 3000);
});
