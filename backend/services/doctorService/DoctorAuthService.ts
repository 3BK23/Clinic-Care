import {Knex} from "knex"
import { hashPassword, comparePassword } from "../../utils/hash";


export class DoctorAuthService{
    constructor(private knex: Knex){}

    table(){
        return this.knex("doctors");
    }
    
    async register(usernameInput:string, passwordInput:string, doctorName:string, clinicName:string){
        try{
            let passwordHash = await hashPassword(passwordInput);

            let insertResult = await this.table().insert({
                username: usernameInput,
                password: passwordHash,
                doctor_name: doctorName,
                clinic_name: clinicName

            })

            if(insertResult != undefined){
                return true;
            }else return false;

        }catch(e){
            console.log("register error");
            return false;
        }
    }
    async login(usernameInput:string, passwordInput:string){
        try{
            let queryResult = await this.table()
            .select("*")
            .where("username", usernameInput);
        
        if (queryResult.length > 0){
            let passwordHash = queryResult[0].password;
            let compare = await comparePassword(passwordInput, passwordHash);

            if(compare)
                return{
                    verified: compare,
                    userId: queryResult[0].id,
                    username: usernameInput
                }
                else return{
                    verified:false,
                    reason: "Your authentication information is incorrect. Please try again."};
                }else{ 
                    return{
                    verified:false,
                    reason: "Sign-in information does not exist. Pleae try again or create a new account."};
                }
        } catch(error){
            console.log("internal error", error);
            return{ verified: false, reason:"internal server error"}
        }
        
    }



}

