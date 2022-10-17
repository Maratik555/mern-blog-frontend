import React, { useEffect, useState } from 'react'

import { CommentsBlock, Index, Post } from '../components'
import { useParams } from 'react-router-dom'
import { instance } from '../axios'
import ReactMarkdown from 'react-markdown'

export const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  
  useEffect(() => {
    instance.get(`/posts/${id}`).then(res => {
      setData(res.data)
      
      setIsLoading(false)
      
    }).catch(err => {
      console.warn(err)
      alert('Ошибка при получении статьи')
    })
  }, [])
  
  
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={1}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={[{
          user: {
            fullName: 'Вася Пупкин',
            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg'
          },
          text: 'Это тестовый комментарий'
        }]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  )
}
