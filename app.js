const express = require("express");
const connectToDb = require("./database/databaseConnect");
const Blog = require("./views/blogmodel");

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

app.get("/", async (req, res) => {
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
  const { title, subtitle, description } = req.body;
  console.log(title, subtitle, description);
  const fileName = req.file.filename;
  await Blog.create({
    title: title,
    subtitle: subtitle,
    description,
    image: fileName, //can write this if both names are same
  });

  res.send("Blog successfully created");
});

app.use(express.static("./storage"));

app.listen(3000, () => {
  console.log("Node.js project started at port " + 3000);
});
