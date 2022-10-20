import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import styles from './Header.module.scss'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectIsAuth } from '../../redux/slice/auth'

export const Header = () => {
  const data = useSelector(state => state.auth?.data)
  const dispatch = useDispatch()
  let isAuth = useSelector(selectIsAuth)
  
  const onClickLogout = () => {
    if (dispatch(logout())) {
      window.confirm('Вы действительно хотите выйти ?')
      window.localStorage.removeItem('token')
    }
  }
  
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Maratik555 BLOG MERN💻</div>
          </Link>
          <div className={styles.login}>{data?.fullName}</div>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
