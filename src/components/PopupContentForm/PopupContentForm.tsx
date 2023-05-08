import React, { useState } from 'react'
import axios from 'axios';

interface ContentMedia {
  media: string,
  groupId: string
}

export const PopupContentForm = ({ media, groupId }: ContentMedia) => {
  const [selectedMedia, setSelectedMedia]: any = useState(null);
  const [cardTitle, setCardTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!selectedMedia || !cardTitle || !description) {
      return
    }

    const formData: FormData = new FormData();

    formData.append("description", description);
    formData.append("cardTitle", cardTitle);
    formData.append("group", groupId);
    formData.append("image", selectedMedia);
    
    const response = await axios.post('http://localhost:3000/new/image/content', formData ,{
      headers: {'Content-Type': 'multipart/form-data'}
    })
    if (response.status === 200) {

    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <h1 className='form-title'>Content card</h1>
        <div className='form-body'>
          <div className='field'>
            <div className='field-title'>Card title</div>
            <input className='field-input' value={cardTitle} onChange={(e) => {setCardTitle(e.target.value)}}></input>
          </div>
          <div className='field'>
            <div className='field-title'>description</div>
            <input className='field-input' type='text-area' value={description} onChange={(e) => {setDescription(e.target.value)}}></input>
          </div>
          <div className='field media-field'>
            <div className='field-title'>Insert {media}</div>
            <input onChange={(e:any) => {
              e.target.files[0].type.includes(media) && setSelectedMedia(e.target.files[0])}
              } className='field-input' type='file'></input>
          </div>
        </div>
        <button className='submit-btn login-btn' type='submit' >Create</button>
      </form>
    </div>
  )
}
