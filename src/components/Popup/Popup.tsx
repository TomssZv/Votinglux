import React, { Children } from 'react'
import style from './Popup.module.scss'
import cross from '../../assets/svg/cross.svg'

export const Popup = (props: any) => {

  return (
    <div style={{display: props.active ? 'none' : 'block'}} className={style.popupContainer}>
      <button onClick={() => props.func()} className={style.closeBtn}><img src={cross} /></button>
      {props.children}
    </div>
  )
}
