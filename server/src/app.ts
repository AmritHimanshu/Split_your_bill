import express from "express";
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config({ path: './src/.env' });

const port = process.env.PORT;

require('./db/conn');

app.use(
  cors({
    origin: true,
    Credential: true,
  })
);

app.use(express.json());
app.use(require("./router/auth"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
