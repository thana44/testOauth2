import React, { useEffect, useState } from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import axios from 'axios'
import axiosIns from './protectRoutes/AxiosInstance'

function Updateuser() {
    const [name, setName] = useState()
    const [lastname, setLastname] = useState()
    const [age, setAge] = useState()

    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)

    useEffect(()=>{
        axiosIns.get('/getid/' + id,{withCredentials:true})
        .then((ans)=>{
            console.log(ans.data)
            setName(ans.data.name)
            setLastname(ans.data.lastname)
            setAge(ans.data.age)
        })
        .catch((err)=>console.log(err))
    },[])

    const btnUpdate = async(e)=>{
        e.preventDefault()
        await axiosIns.put('/update/' + id, {name, lastname, age},{withCredentials:true})
        navigate('/')
    }

  return (
    <div>
        <h1>Page Update User.</h1>
        <form onSubmit={btnUpdate}>
            <label>Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='Enter your Name'></input>
            <label>lastName</label>
            <input onChange={(e)=>setLastname(e.target.value)} type='text' value={lastname} placeholder='Enter your Lastname'></input>
            <label>Age</label>
            <input onChange={(e)=>setAge(e.target.value)} type='text' value={age} placeholder='Enter your Age'></input>
            <button>Update</button>
        </form>
    </div>
  )
}

export default Updateuser