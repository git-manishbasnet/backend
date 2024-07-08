const express=require('express');
const app=express();

app.set('view engine','ejs')

app.get('/about',(req,res)=>{
    const name="Manish Basnet"
    // console.log(req)
   res.render("about.ejs",{name})
})
app.get('/contact',(req,res)=>{
    age=20
    // res.send("Hello World <h1>contact</h1>")
    res.render("contact.ejs",{age})
}
)

app.listen(3000,()=>{

    console.log("Node.js project started at port "+ 3000)
})
