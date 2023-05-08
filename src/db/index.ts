import { Field, createConnection } from "mysql2";
import { resolve } from "path";
import dotenv from 'dotenv';

dotenv.config()

const connection = createConnection({
  host: process.env['DB_HOST'] ?? '',
  user: process.env['DB_USER'] ?? '',
  password: process.env['DB_PASSWORD'] ?? '',
  database: process.env['DB'] ?? '',
  port: parseInt(process.env['DB_PORT']!),
})

export function getUser(email: string) {
  if (!connection) return;
  
  return new Promise ((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?;",
      [email],
      (err, results: any[], fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    })
  })

};

export function setNewUser(
  name: string,
  surname: string,
  username: string,
  email: string,
  password: string,
) {
  return new Promise ((resolve, reject) => {
    connection.query(
    "INSERT INTO users (name, surname, username, email, password, admin) VALUES (?, ?, ?, ?, ?, ?);",
    [name, surname, username, email, password, 0],
    (err, result: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

export function getCategoriesDB() {
  return new Promise ((resolve, reject) => {
    connection.query(
      "SELECT * FROM category;",
      (err: Error, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

export function getAllMedia() {
  return new Promise ((resolve, reject) => {
    connection.query(
      "SELECT * FROM media;",
      (err: Error, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

export function createGroup(
  name: string,
  owner: number,
  isPrivate: number,
  searchable: number,
  media: number,
  color: string
) {
  return new Promise ((resolve, reject) => {
    connection.query(
    "INSERT INTO rate_group (name, owner, private, searchable, media, banner) VALUES (?, ?, ?, ?, ?, ?);",
    [name, owner, isPrivate, searchable, media, color],
    (err, result: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(result)
      }
    })
  })
  
}

export function addGroupMembers(
  members: number[],
  groupId: number
) {
  return new Promise ((resolve, reject) => {

  })
}

export function addCategories(
  categories: number[],
  groupId: number
) {
  return new Promise ((resolve, reject) => {
    for (let i = 0; i < categories.length; i++) {
      connection.query(
        "INSERT INTO group_categories (group_categories.group, category) VALUES (?, ?);",
        [groupId, categories[i]],
        (err, result: any[]) => {
          if (err) {
            reject(err);
          }
        })
    }
    resolve('Categories inserted')
  })
}

export function getGroupData(
  id: number
  ) {
  return new Promise ((resolve, reject) => {
    connection.query(` 
    select 
	  rg.id id,
    rg.name groupName,
    rg.owner groupOwner,
    rg.private isPrivate,
    rg.media mediaType,
    rg.banner bannerColor,
    media.name mediaName
    from rate_group rg
    join group_categories gc on gc.group = rg.id
    join media on media.id = rg.media where rg.id = (?) LIMIT 1;`,
    [id],
    (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

export function getGroupOwner() {
  return new Promise ((resolve, reject) => {
    connection.query(
      "SELECT id FROM users;",
      (err: Error, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}

export function createContent(
  cardTitle: any,
  description: any,
  path: any,
  userId: any,
  group: any
) {
  return new Promise ((resolve, reject) => {
    connection.query(
      "INSERT INTO content_card (title, description, media_url, owner, content_card.group) VALUES (?, ?, ?, ?, ?);",
      [
        cardTitle,
        description,
        path,
        userId,
        group
      ],
      (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      }
    )
  })
}