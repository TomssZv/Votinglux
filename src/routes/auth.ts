import { NextFunction, Request, Response } from "express";
import { getUser, setNewUser } from "../db/index"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config()

const saltRounds = 10;

export const deleteSessionHandler = (req: Request, res: Response) => {
  const deleteCookies = [
    'refreshToken',
    'accessToken',
    'userData'
  ];

  for (let i = 0; i < deleteCookies.length; i++) {
    res.clearCookie(deleteCookies[i]);
  }

  res.sendStatus(200).send('Loged out!')
}

export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err: any, user: any) => {
      if (err) {
        if (req.cookies.userData) {
          res.clearCookie('userData');
        }
          return res.sendStatus(403);
      } 
      req.user = user;
      next()
    });

  } else {
      generateToken(req, res, next);
  }
};

export async function generateToken(req: any, res: Response, next: NextFunction) {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {

    jwt.verify(refreshToken, process.env.REFRESH_PRIVATE_KEY!, (err: any, user: any) => {
      if (err) {
        if (req.cookies.userData) {
          res.clearCookie('userData');
        }
          return res.sendStatus(403);
      }
      const accessToken: string = jwt.sign(
        {
          isAdmin: user.isAdmin,
          username: user.username,
          email: user.email
        },
        process.env.JWT_PRIVATE_KEY!,
        { 
          algorithm: 'RS256',
          expiresIn: '15m'
        }
      );
  
      res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true, 
      })
      
      req.user = user;

      return next()
    });
  
  } else {
    if (req.cookies.userData) {
      res.clearCookie('userData');
    }
    return res.sendStatus(401).send("Can't refresh. Invalid Token");
  }
}

export async function userLogin(req: Request, res: Response) {

  const {email, password} = req.body;

  const user: any = await getUser(email);

  if(!user) {
    return res.status(401).send("Invalid email or password");
  }

  bcrypt.compare(password, user.password, (err, results: boolean) => {
    if (results != true) {
      return
    } else {
      return res.status(401).send("Invalid email or password");
    };

  })

  JWTkeyPair(res, user.admin, user.username, user.email, user.id, 1);
  
  return res.send({username: user.username, admin: user.admin});
  
}

export async function userRegister(req: Request, res: Response) {
  const { name, surname, username, email, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err, hash: string) => {
    const user: any = await setNewUser(name, surname, username, email, hash);
    JWTkeyPair(res, 0, username, email, user.inserteId, 1);
    return res.send({username: username, admin: 0})
  }); 

}

function JWTkeyPair(res: Response, admin: number, username: string, email: string, id: number, userData: number) {
  const accessToken: string = jwt.sign(
    {
      isAdmin: admin,
      username: username,
      email: email,
      userId: id
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
      email: email,
      userId: id
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

  if (userData === 1) {
    res.cookie('userData', {
      logedIn: true,
      username: username,
      email: email
    }, {
      maxAge: 3.6e+6
    })
  }
}