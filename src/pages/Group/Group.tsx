import React, { Key, useEffect, useState } from 'react'
import style from './Group.module.scss'
import { useParams } from 'react-router'
import addIcon from '../../assets/svg/add.svg';
import axios from 'axios';
import { Popup } from '../../components/Popup/Popup';
import { PopupContentForm } from '../../components/PopupContentForm/PopupContentForm';
import { ContentCard } from '../../components/ContentCard/ContentCard';

export const Group = () => {
  const [groupData, setGroupData]: any[] = useState([])
  const [groupContent, setGroupContent]: any[] = useState([])
  const [popupActive, setPopupActive] = useState(false)

  const { groupId }: any = useParams()

  const sendPopupState = () => {
    setPopupActive(false)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/get/group/', {
      params: {
        groupId: groupId,
        content: true
      }
    })
    .then(result => {
      console.log(result);
      setGroupData(result.data.groupData[0]);
      setGroupContent(result.data?.groupContent)
    })
    .catch(err => console.error(err))

  }, [])

  return (
    <div>
      {popupActive && <Popup func={sendPopupState} ><PopupContentForm media={groupData.mediaName} groupId={groupId} /></Popup>}
      <div className={style.banner} style={{backgroundColor: `#${groupData.bannerColor}`}}>
        <h2>{groupData.groupName}</h2>
        <div className={style.contentBtn}>
          <button onClick={() => {setPopupActive(!popupActive)}}><img src={addIcon} /></button>
        </div>
      </div>
      <div className={style.cardWrapper}>
        {groupContent && groupContent.map((elem: any, key: Key) => {
           return (
              <ContentCard
                key={key}
                title={elem.title}
                description={elem.description}
                mediaUrl={elem.media_url}
                mediaType={groupData.mediaName}
                rating={elem.rating}
                cardId={elem.id}
              />
           )
           
        })}
      </div>
    </div>
  )
}
