import React from 'react'
import dotIcon from '../../assets/svg/dots-3.svg'
import style from './DotChoice.module.scss'

function DotChoice() {
  return (
    <div className={`dot-choice ${style.dotChoice}`}>
      <img src={dotIcon} />
    </div>
  )
}

export default DotChoice