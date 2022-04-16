import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs'
import hbs from 'hbs'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
const file = ''
const jsonParser = express.json();

app.set("view engine", "hbs");
app.set("views", "public");
hbs.registerPartials(__dirname + "/public/partials");
console.log(__dirname);


app.use(express.static(path.resolve(__dirname, "public")));

app.post("/writeFile/", jsonParser,  (req, res) => {
  if (!req.body) return res.sendStatus(400);
fs.writeFile(`G-codes/${req.body.name}.${req.body.ext}`, req.body.text.join('\n'), e=>{
})
});

app.use('/contacts', (req, res)=>{
  res.render('contacts.hbs')
})

app.use("/examples", (req, res) => {
  res.render("examples.hbs");
});

app.use("/", function (req, res) {
  res.render("index.hbs");
  //  res.sendFile(__dirname + "/public/index.html");
});


// app.use("/about", function (req, res) {
//   console.log("GET");
//   res.sendFile(__dirname + "/public/about.html");
// });


const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Server has been started on port ${PORT}...`);
})