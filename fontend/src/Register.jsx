import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from './Loading'

function Register() {

    const [data, setData] = useState({
        username: '',
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
            await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/register`,data)
            .then((response)=>{
                const {msg} = response.data
                if(msg){
                    return alert(msg)
                }
                alert('successfully')
                return navigate('/login')
            })
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    
  return (
    <div style={{ height:'100svh',display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        {
            loading && <Loading/>
        }
        <div style={{display:'grid', gap:'4px'}}>
            <span style={{fontWeight:'700', margin:'10px auto'}}>Register Page</span>
            <label>username</label>
            <input name='username' onChange={typingFunction} placeholder='type your username.'></input>
            <label>email</label>
            <input name='email' onChange={typingFunction} placeholder='type your email.'></input>
            <label>password</label>
            <input type='password' name='password' onChange={typingFunction} placeholder='type your password.'></input>
            <button onClick={submitFunction} style={{margin:'10px 0'}}>Sign Up</button>
            <span>already have an account? <Link to={'/login'}>login</Link></span>
        </div>
    </div>
  )
}

export default Register