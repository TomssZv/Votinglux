import { Request, Response } from "express";
import { getCategoriesDB } from "../db";

export async function getCategories(req: Request, res: Response) {
  const categories: any = await getCategoriesDB();

  if (categories) {
    return res.send({'data': categories})
  }
}