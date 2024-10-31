import { DoctorAuthService } from "../services/doctorService/DoctorAuthService";
import {Request,Response,Router} from "express"
import jwtSimple from "jwt-simple"
import dotenv from "dotenv";

dotenv.config();

export class DoctorAuthController{
    router = Router();
    constructor(private doctorAuthService: DoctorAuthService){
            this.router.post("/register", this.register);
            this.router.post("/drLogin", this.login.bind(this))
    }

    register = async (req:Request, res: Response)=>{
        let {usernameInput, passwordInput, doctorName, clinicName} =req.body;

        let result = await this.doctorAuthService.register(usernameInput,passwordInput,doctorName, clinicName)

        if(result){
            res.json({message:"register succuss"})
        }else{
            res.status(500).json({message: "Internal Server Error! Register Failed."})
        }
    }

    async login(req:Request, res:Response){
    let {usernameInput, passwordInput} = req.body;
    console.log("check 1", usernameInput, passwordInput);
    let result = await this.doctorAuthService.login(usernameInput, passwordInput);
    
    if(result.verified){
        const payload = { userId: result.userId, username: result.username}
        console.log("check payload", payload);

        const jwtToken = jwtSimple.encode(payload, process.env.JWT_SECRET!)

        res.json({ message: "login success", token: jwtToken});
    } else {
        console.log("login fail", result.reason)
        res.status(400).json({message: "Sign-in Information incorrect, please try again."})
    }

    }
}


