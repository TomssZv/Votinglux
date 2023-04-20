import { NextFunction, Request, Response } from "express";
import { getUser, setNewUser } from "../db/index"
import jwt from 'jsonwebtoken'

const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

export async function generateToken(req: Request, res: Response, next: NextFunction) {
  if (req.cookies['refreshToken']) {

    const accessToken: string = jwt.sign(
      {
        isAdmin: req.body.admin,
        username: req.body.username,
        email: req.body.email
      },
      process.env.REFRESH_PRIVATE_KEY!,
      { 
        algorithm: 'RS256',
        expiresIn: '1d'
      }
    );

    res.cookie('accessToken', accessToken, {
      maxAge: 300000,
      httpOnly: true, 
    })

    
  } else {
    return res.status(401).send("Can't refresh. Invalid Token");
  }
  next();
}

export async function userLogin(req: Request, res: Response) {

  const {email, password} = req.body;

  const user: any = await getUser(email);

  if(!user) {
    return res.status(401).send("Invalid email or password");
  }

  bcrypt.compare(password, user.password, (err: Error, results: boolean) => {
    if (results != true) {
      return
    } else {
      return res.status(401).send("Invalid email or password");
    };

  })

  JWTkeyPair(res, user.admin, user.username, user.email);

  res.cookie('userData', {
    logedIn: true,
    username: user.username,
    email: user.email
  }, {
    maxAge: 3.6e+6
  })
  
  return res.send({username: user.username, admin: user.admin});
  
}

export async function userRegister(req: Request, res: Response) {
  const { name, surname, email, username, password } = req.body;
  bcrypt.hash(password, saltRounds, (err: Error, hash: string) => {
    setNewUser(name, surname, email, username, hash);
  }); 

  JWTkeyPair(res, 0, username, email);

  res.cookie('userData', {
    logedIn: true,
    username: username,
    email: email
  }, {
    maxAge: 3.6e+6
  })

  return res.send({username: username, admin: 0})
}

function JWTkeyPair(res: Response, admin: number, username: string, email: string) {
  const accessToken: string = jwt.sign(
    {
      isAdmin: admin,
      username: username,
      email: email
    },
    process.env.JWT_PRIVATE_KEY!,
    { 
      algorithm: 'RS256',
      expiresIn: '15m'
    }
  );

  const refreshToken: string = jwt.sign(
    {
      isAdmin: admin,
      username: username,
      email: email
    },
    process.env.REFRESH_PRIVATE_KEY!,
    { 
      algorithm: 'RS256',
      expiresIn: '1d'
    }
  );

  res.cookie('accessToken', accessToken, {
    maxAge: 900000,
    httpOnly: true, 
  })

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.6e+6,
    httpOnly: true, 
  })
}