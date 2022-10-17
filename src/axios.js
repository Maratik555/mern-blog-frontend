import axios from 'axios'


export const instance = axios.create({
	baseURL: 'http://localhost:4000'
})

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})
