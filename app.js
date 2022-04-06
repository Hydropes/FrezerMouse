import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/", function (req, res) {
   console.log("GET");
   res.sendFile(__dirname + "/public/index.html");
});


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server has been started on port ${PORT}...`);
})