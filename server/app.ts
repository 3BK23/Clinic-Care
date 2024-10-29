import express from 'express';
import Knex from 'knex';

const app = express();
var cors = require('cors');
const PORT = 8080;

//knex config
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

//cors
app.use(cors())

//json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });