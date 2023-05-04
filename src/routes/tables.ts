import { Request, Response } from "express";
import { createGroup, getAllMedia, getCategoriesDB } from "../db";

export async function getCategories(req: Request, res: Response) {
  const categories: any = await getCategoriesDB();

  if (categories) {
    return res.send({'data': categories})
  }
}

export async function getMedias(req: Request, res: Response) {
  const medias: any = await getAllMedia();

  if (medias) {
    return res.send({'data': medias})
  }
}

export async function createNewGroup(req: any, res: Response) {
  const data = req.body.data;

  const group: any = await createGroup(
    data.groupName,
    req.user.userId,
    data.isPrivate,
    data.searchable,
    data.media
  )

  if (group) {
    res.send({'data': group})
  }
}