import { useState } from 'react'
import styles from './Category.module.scss'

interface CategoryInfo {
  categoryId: number,
  categoryName: string,
  adult: number,
  sendId: Function,
}

export const Category = ({ categoryId, categoryName, adult, sendId }: CategoryInfo) => {
  const [selected, setSelected] = useState(false);

  const classes = `
    ${adult ? 'adult' : 'regular'}
    ${styles.category}
    ${selected ? styles.selected : ''}
  `

  return (
    <div 
      onClick={() => {
        setSelected(!selected);
        sendId(categoryId);
      }}
      className={classes}
      id={`${categoryId}`}>
      {categoryName}
    </div>
  )
}
