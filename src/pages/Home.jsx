import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'

import { CommentsBlock, Post, TagsBlock } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchTags } from '../redux/slice/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.posts)
  const userData = useSelector(state => state.auth.data)
  
  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  
  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    
  }, [])
  
  return (
    <>
      <Tabs style={{ marginBottom: 20 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => (
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={1}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={[{
            user: {
              fullName: 'Sveta Nekrasova',
              avatarUrl: 'https://mui.com/static/images/avatar/3.jpg'
            },
            text: 'Это тестовый коммент!'
          },
            {
              user: {
                fullName: 'Maratik555',
                avatarUrl: 'https://mui.com/static/images/avatar/5.jpg'
              },
              text: 'Это тестовый коммент!'
            }
          ]}
                         isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}
