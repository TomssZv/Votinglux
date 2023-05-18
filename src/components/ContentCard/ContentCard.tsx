import React, { useEffect, useState } from 'react'
import style from './ContentCard.module.scss'
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { group } from 'console';

interface ContentProps {
  title: string,
  description: string,
  mediaUrl: string,
  mediaType: string,
  rating: number,
  cardId: number
}

export const ContentCard = ({
  title,
  description,
  mediaUrl,
  mediaType,
  rating,
  cardId
}: ContentProps) => {
  const [userRating, setUserRating] = useState(0);
  const [image, setImage]: any = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/get/media/', {
      params: {
        mediaType: mediaType,
        mediaUrl: mediaUrl
      }
    })
    .then(result => {
      console.log(result.data);
      setImage(result.data)
    })
    .catch(err => console.error(err))
  }, [])

  const handleRating = (newRating: any) => {
    console.log(newRating)
    if (newRating === null) {
      newRating = 0;
    };
    
    axios.post('http://localhost:3000/set/rating', {
      data: {
        cardId: cardId,
        rating: newRating
      }
    })
  }

  return (
    <div className={style.card}>
      <div className={`${style.media} card-${mediaType}`}>
        <div className={style.rating}>{rating}</div>
        <img className={style.image} src={`http://localhost:5173/${mediaUrl}`} />
      </div>
      <div className={style.footer}>
        <h4 className={style.title}>{title}</h4>
        <p className={style.description}>{description}</p>
        <Rating 
          style={{color: "gold"}}
          className={style.ratingBar}
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
          onChange={(event, newValue: any) => {setUserRating(newValue), handleRating(newValue)}}
        />
      </div>
    </div>
  )
}
