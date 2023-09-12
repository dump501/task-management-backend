const express = require("express");
const router = require("./routes/routes");
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(router);

app.listen(PORT, ()=>{
    console.log(`The server is up and running on port : ${PORT}`);
})