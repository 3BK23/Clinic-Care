import { Bearer } from "permit"
import { NextFunction, Request, Response } from "express"
import jwtSimple from "jwt-simple"

// A permit that checks for HTTP Bearer Auth, falling back to a query string.
const permit = new Bearer({
  query: 'access_token',
})

export async function checkToken( req: Request, res:Response, next: NextFunction) {
  // Try to find the bearer token in the request.
  try{
  const token = permit.check(req)

  // No token, that means they didn't pass credentials!
  if (!token) {
    return res.status(400).json({msg: "Authentication required!"})
  }

  const decoded = jwtSimple.decode(token, process.env.JWT_SECRET!);

  req.body.userId = decoded.userId;
  req.body.username = decoded.username;

  return next();
}catch(error){
    return res.status(400).json({msg: "Authentication required!"})
}

}