import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './slice/posts'
import { authReducer } from './slice/auth'


const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer
  }
})

export default store