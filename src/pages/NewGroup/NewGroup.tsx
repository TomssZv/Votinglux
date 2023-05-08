import React, { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';
import DotChoice from '../../components/DotChoice/DotChoice';
import MediaTypeCard from '../../components/mediaTypeCard/MediaTypeCard';
import style from './NewGroup.module.scss';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Category } from '../../components/Category/Category';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function NewGroup() {
  const [groupName, setGroupName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectCategories, setSelectCategories]: any[] = useState([]);
  const [media, setMedia]: any = useState([]);
  const [selectedMedia, setSelectedMedia]: any = useState(null);
  const [isPrivate, setIsPrivate] = useState(0);
  const [searchable, setSearchable] = useState(0);

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!groupName) {
      alert("Group name can't be empty")
      return
    }

    axios.post('http://localhost:3000/new/group', {
      data: {
        groupName: groupName,
        categories: selectCategories,
        media: selectedMedia,
        isPrivate: isPrivate,
        searchable: searchable,
      }
    })
    .then((result) => {
      navigate(`/group/${result.data.data.insertId}`)
    })
    .catch(err => {console.log(`Error - ${err}`)})

  }

  const handleCategorySelect = (id: number) => {

    if (selectCategories.includes(id)) {

      // Remove all ids that match with id
      while (selectCategories.includes(id)) {
        const index = selectCategories.indexOf(id)
        setSelectCategories(selectCategories.splice(index, 1))
      }
    } else {
      setSelectCategories([...selectCategories, id])
    }

  }

  const handleMediaSelect = (id: number) => {
    setSelectedMedia(id);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
    .then((result: AxiosResponse<any, any>) => setCategories(result.data.data))

    .catch((err: AxiosError) => {
      console.error(err)
    })

    axios.get('http://localhost:3000/medias')
    .then((result: AxiosResponse<any, any>) => {
      const data = result.data.data;
      if (selectedMedia) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === selectedMedia) {
            setMedia([data[i]])
            break
          }
        }
      } else {
        setMedia(data)
      }
    })

    .catch((err: AxiosError) => {
      console.error(err)
    })

  }, [selectedMedia])

  return (
    <div className='table-form-container'>
      <form onSubmit={handleSubmit}>
        <div className={style.banner}>
          <input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder='Group name' />
          <DotChoice />
        </div>
        <div className={style.categories}>
          {categories.map((elem: {id: number, name: string, adult: number}, key) => {
            return <Category
            categoryId={elem.id}
            categoryName={elem.name}
            adult={elem.adult}
            sendId={handleCategorySelect}
            key={key}
            />
          })}
        </div>
        <div className={style.mediaChoiceInput}>
          {media.map((elem: {id: number, name: string}, key: any) => <MediaTypeCard
           key={key}
           type={elem.name}
           id={elem.id}
           sendId={handleMediaSelect}
           />)}
        </div>
        <div>
          <span style={{marginRight: "10px", color: "black"}}>
            Private: 
            <input onChange={(e: any) => setIsPrivate(e.target.checked ? 1 : 0)} type='checkbox' />
          </span>
          <span style={{color: "black"}}>
            Searchable:
            <input onChange={(e: any) => setSearchable(e.target.checked ? 1 : 0)} type='checkbox' />
          </span>
        </div>
        <button 
        onSubmit={handleSubmit}
        className={style.submitBtn}>
          Create table
        </button>
      </form>
    </div>
  )
}

export default NewGroup