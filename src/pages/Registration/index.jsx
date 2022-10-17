import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegister, selectIsAuth } from '../../redux/slice/auth'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onBlur'
  })
  
  const onSubmit = async (val) => {
    const data = await dispatch(fetchRegister(val))
    
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться!')
    }
    
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  
  if (isAuth) {
    return <Navigate to="/" />
  }
  
  
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField className={styles.field} label="Полное имя"
                   error={Boolean(errors.fullName?.message)}
                   helperText={errors.fullName?.message}
                   {...register('fullName', { required: 'Укажите имя' })}
                   fullWidth />
        <TextField className={styles.field} label="Почта" type="email"
                   error={Boolean(errors.email?.message)}
                   helperText={errors.email?.message}
                   {...register('email', { required: 'Укажите почту' })}
                   fullWidth />
        <TextField className={styles.field} label="Пароль"
                   error={Boolean(errors.password?.message)}
                   helperText={errors.password?.message}
                   {...register('password', { required: 'Укажите пароль' })}
                   fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
