import React from 'react'
import { instance } from '../axios'
import TagIcon from '@mui/icons-material/Tag'


export const FullTags = () => {
  const [data, setData] = React.useState()
  
  React.useEffect(() => {
    instance.get(`/tags`)
      .then(res => setData(res.data))
      .catch(err => {
        console.warn(err)
        alert('Ошибка при получении тэгов')
      })
  }, [])
  
  return (
    <div>
      <h3>Все тэги</h3>
      {data?.map((d) => (
        <>
          <TagIcon />
          <li style={{ listStyle: 'none' }}>{d}</li>
          <hr />
        </>
      ))
      }
    </div>
  )
}


