import React from 'react';
import { useEffect, useState } from 'react';
import DotChoice from '../../components/DotChoice/DotChoice';
import MediaTypeCard from '../../components/mediaTypeCard/MediaTypeCard';
import style from './NewTable.module.scss';
import axios, { Axios, AxiosError, AxiosPromise, AxiosResponse } from 'axios';

function NewTable() {
  const [mediaType, setMediaType] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [categories, setCategories] = useState([]);

  const media = ['image', 'video'];

  const handleSubmit = () => {
  
  }

  useEffect(() => {
    axios.get('http://localhost:3000/categories', {
      params: {
        "foo": 'bar'
      }
    })
    .then((result: AxiosResponse<any, any>) => setCategories(result.data.data))

    .catch((err: AxiosError) => {
      console.error(err)
    })
  }, [])

  return (
    <div className='table-form-container'>
      <form onSubmit={handleSubmit}>
        <div className={style.banner}>
          <input placeholder='Group name' />
          <DotChoice />
        </div>
        <div className={style.categories}>
          {categories.map((elem: {id: number, name: string, adult: number}, key) => {
            return <p key={key} >{elem.name}</p>
          })}
        </div>
        <div className={style.mediaChoiceInput}>
          {media.map((elem, key) => <MediaTypeCard key={key} type={elem} />)}
        </div>
      </form>
    </div>
  )
}

export default NewTable