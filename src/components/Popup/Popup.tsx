import React, { Children } from 'react'
import style from './Popup.module.scss'

export const Popup = (props: any) => {
  return (
    <div className={style.popupContainer}>
      {props.children}
    </div>
  )
}
