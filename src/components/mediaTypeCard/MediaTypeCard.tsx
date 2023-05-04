import React from 'react';
import style from './mediaTypeCard.module.scss';
import mediaPlaceholder from '../../assets/images/mediaPlaceholder.jpg';
import videoMediaPlaceholder from '../../assets/videos/videoMediaPlaceholder.mp4'
import ReactPlayer from 'react-player';

interface MediaProps {
  type: string
  sendId: Function
  id: number
}

export default function MediaTypeCard({ type, sendId, id }: MediaProps) {

  return (
    <div className={style.mediaCard} onClick={() => sendId(id)}>
      <div className={style.mediaDisplay} >
        {type === 'image' && <img style={{height: 'inherit', width: 'inherit'}} src={mediaPlaceholder} />}
        {type === 'video' && <ReactPlayer style={{height: 'inherit', width: 'inherit'}} url={videoMediaPlaceholder}
         controls={false}
         loop={true}
         playing={true}
         muted={true} />}
      </div>
      <div style={{maxWidth: type === 'image' ? '200px' : '300px'}} className={style.cardDescription}>
        <h5>{type[0].toUpperCase() + type.slice(1)} media type</h5>
        <p>Description of card</p>
      </div>
    </div>
  )
}
