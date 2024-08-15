import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import axiosIns from './protectRoutes/AxiosInstance'

function Alluser() {
    const [user, setUser] = useState([])
    const [name, setName] = useState()
    const [pic, setPic] = useState()

    const navigate = useNavigate()

    useEffect(()=>{
        try{
            axiosIns.get(`/api/getcurrentuser`,{withCredentials: true})
            .then((response)=>{
                const {profileImg, username} = response.data
                setName(username)
                setPic(profileImg)
                console.log(response.data)
            })
        }catch(err) {console.log(err)}
    },[])

    useEffect(()=>{
        axiosIns.get('/getall',{withCredentials: true})
        .then((ans)=>{
            console.log(ans.data)
            setUser(ans.data)
        })
        .catch((e)=>console.log(e))
    },[])

    const funcdel = async(id)=>{
        await axiosIns.delete('/delete/' + id,{withCredentials: true})
        window.location.reload()
    }

    const logoutGoogle = async()=>{
        try{
            window.open(`${import.meta.env.VITE_BACKEND_DOMAIN}/logout`,'_self')
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <h1>Page All User.</h1>
        <Link to="/create"><button>Create User</button></Link>
        <span>{name}</span>
        <img style={{width:'40px', height:'40px',objectFit:'cover',borderRadius:'50%'}} src={pic}></img>
        <button onClick={logoutGoogle}>Log out</button>
        <table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>LastName</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((users, index)=>{
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{users.name}</td>
                                <td>{users.lastname}</td>
                                <td>{users.age}</td>
                                <td><Link to={`/update/${users._id}`}><button>Update</button></Link><button onClick={()=>funcdel(users._id)}>Delete</button></td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Alluser