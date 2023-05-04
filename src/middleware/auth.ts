import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
require('dotenv').config();

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string)
    const {email, password} = req.body;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
}
