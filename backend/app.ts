import Knex  from 'knex';
import express from 'express';
import cors from "cors";
import { DoctorAuthController} from './controllers/DoctorAuthController';
import { DoctorAuthService} from './services/doctorService/DoctorAuthService';
import knexConfig from './knexfile';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const PORT = 8080;

const doctorAuthService = new DoctorAuthService(knex);
const doctorAuthController = new DoctorAuthController(doctorAuthService)

app.get('/', (req, res) => {
    res.send('hihi');
  });
app.use("/drAuth", doctorAuthController.router)
  
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});