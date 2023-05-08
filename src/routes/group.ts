import { Request, Response } from "express";
import {
  addCategories,
  createGroup,
  getAllMedia,
  getCategoriesDB,
  getGroupData,
  createContent
} from "../db";

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

  const generateBannerColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
  }

  const bannerColor = generateBannerColor();

  const group: any = await createGroup(
    data.groupName,
    req.user.userId,
    data.isPrivate,
    data.searchable,
    data.media,
    bannerColor
  )

  const categories: any = await addCategories(
    data.categories,
    group.insertId
  )

  if (group) {
    res.send({'data': group})
  }
}

export async function getGroup(req: Request, res: Response) {
  const groupId: any = req.query.groupId

  if (!groupId) {
    res.sendStatus(500).send('No groupId sent!')
  }

  const groupData = await getGroupData(groupId);

  res.send(groupData);
}

export async function createImageContent(req: any, res: Response) {
  const data = req.body;
  const file = req.file;

  const content = await createContent(
    data.cardTitle,
    data.description,
    file.path,
    req.user.userId,
    data.group,
  )
  res.send(content)
}