import { Route, Routes } from 'react-router-dom'

import Container from '@mui/material/Container'

import { Header } from './components'
import { AddPost, FullPost, FullTags, Home, Login, Registration } from './pages'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAuthMe } from './redux/slice/auth'

function App() {
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/tags" element={<FullTags />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
