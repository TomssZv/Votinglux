import { Request, Response } from "express";
import {
  addCategories,
  createGroup,
  getAllMedia,
  getCategoriesDB,
  getGroupData,
  createContent,
  getGroupContent,
  setUserRating,
  getRating,
  updateUserRating
} from "../db";
import fs from 'fs';

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
  const { groupId, content }: any = req.query

  if (!groupId || !content) {
    res.sendStatus(422).send('Missing parameters')
  }

  const groupData = await getGroupData(groupId);

  if (!groupData) {
    res.sendStatus(400).send('No group data retrieved!')
  }

  if (!content) {
    res.send({ groupData: groupData })
  } else if (content) {
    const groupContent: any = await getGroupContent(groupId);

    if (typeof groupContent.rating == "string") {
      groupContent.rating = Number(groupContent.rating)
    }

    res.send({ groupData: groupData, groupContent: groupContent })
    
  }

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

export async function setRating(req: any, res: Response) {
  const data = req.body.data;

  const userRated: any = await getRating(
    data.cardId,
    req.user.userId
  ) 

  if (userRated.length == 0) {
    const userRating: any = await setUserRating(
      data.rating,
      data.cardId,
      req.user.userId
    )
  } else {
    const userRating: any = await updateUserRating(
      data.rating,
      data.cardId,
      req.user.userId
    )
  }

  res.send(userRated)
}