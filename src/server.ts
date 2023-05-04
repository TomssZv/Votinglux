import { Request, Response } from "express";
import routes from "./routes";
import cookies from "cookie-parser"
import express from 'express';
import cors from 'cors';

const app = express();

// Values for configs
const port: number = 3000
const corsOptions: object ={
  origin:'http://localhost:5173', 
  credentials:true,
}

// used functions
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());


app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Welcome to test api" });
})

function main() {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })

  routes(app);
}

main()