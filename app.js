const express = require("express");
const connectToDb = require("./database/databaseConnect");
const Blog = require("./views/blogmodel");

const app = express();

connectToDb();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
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

app.get("/blog", (req, res) => {
res.render("createBlog.ejs");
});

app.post("/createblog",async(req,res)=>{
    // const title=req.body.title
    // const subtitle=req.body.subtitle
    // const description=req.body.description
    const{title,subtitle,description}=req.body
    console.log(title,subtitle,description)

    await Blog.create({
        title:title,
        subtitle:subtitle,
        description     //can write this if both names are same

    })

    res.send("Blog successfully created")
})

app.listen(3000, () => {
  console.log("Node.js project started at port " + 3000);
});
