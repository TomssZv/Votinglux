import React, { useEffect, useState } from 'react'
import style from './Group.module.scss'
import { useParams } from 'react-router'
import addIcon from '../../assets/svg/add.svg';
import axios from 'axios';
import { Popup } from '../../components/Popup/Popup';
import { PopupContentForm } from '../../components/PopupContentForm/PopupContentForm';

export const Group = () => {
  const [groupData, setGroupData]: any[] = useState([])
  const [popupActive, setPopupActive] = useState(false)

  const { groupId }: any = useParams()

  useEffect(() => {
    axios.get('http://localhost:3000/get/group/', {
      params: {
        groupId: groupId
      }
    })
    .then(result => {console.log(result);setGroupData(result.data)})
    .catch(err => console.error(err))

  }, [])

  return (
    <div>
      {popupActive && <Popup><PopupContentForm media={groupData[0]?.mediaName} groupId={groupId} /></Popup>}
      <div className={style.banner} style={{backgroundColor: `#${groupData[0]?.bannerColor}`}}>
        <h2>{groupData[0]?.groupName}</h2>
        <div className={style.contentBtn}>
          <button onClick={() => {setPopupActive(!popupActive)}}><img src={addIcon} /></button>
        </div>
      </div>
    </div>
  )
}
