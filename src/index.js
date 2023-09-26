const express = require("express");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = 8080;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`The server is up and running on port : ${PORT}`);
});
