import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading'

function Login() {

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const typingFunction = async(e)=>{
        try{
            const {name, value} = e.target
            setData({
                ...data,
                [name]: value
            })
        }catch(err){
            console.log(err)
        }
    }

    const submitFunction = async()=>{
        setLoading(true)
        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/login`,data, {withCredentials: true})
            .then((response)=>{
                const {msg} = response.data
                if(msg){
                    return alert(msg)
                }
                alert('successfully.')
                return navigate('/')
            })
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    console.log(data)

    const loginwithGoogle = async()=>{
        setLoading(true)
        try{
            window.open(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/google/callback`,'_self')
        }catch(err){
            console.log(err)
        }
    }

    const loginwithGithub = async()=>{
        setLoading(true)
        try{
            window.open(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/github/callback`,'_self')
        }catch(err){
            console.log(err)
        }
    }
    
  return (
    <div style={{ height:'100svh',display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        {
            loading && <Loading/>
        }
    <div style={{display:'grid', gap:'4px'}}>
        <span style={{fontWeight:'700', margin:'10px auto'}}>Login Page</span>
        <label>email</label>
        <input name='email' onChange={typingFunction} placeholder='type your email.'></input>
        <label>password</label>
        <input type='password' name='password' onChange={typingFunction} placeholder='type your password.'></input>
        <button onClick={submitFunction} style={{margin:'10px 0'}}>Sign In</button>
        <button onClick={loginwithGoogle}>sign in with Google</button>
        <button onClick={loginwithGithub}>sign in with Github</button>
        <span>don't have an account? <Link to={'/register'}>register</Link></span>
    </div>
</div>
  )
}

export default Login