import bcrypt from "bcrypt"

const SALT_ROUND = 5;

export async function hashPassword(passwordInput: string){
    let passwordHash = await bcrypt.hash(passwordInput, SALT_ROUND);
    return passwordHash
}

export async function comparePassword(passwordInput:string, passwordHash:string){
    console.log("check", passwordInput, passwordHash);
    let result = await bcrypt.compare(passwordInput, passwordHash);
    return result
}