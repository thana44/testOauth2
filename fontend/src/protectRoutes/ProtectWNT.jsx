import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const ProtectWNT = ()=>{
    try{
        const ptauth = Cookies.get('PTauth')
        return !ptauth? <Outlet/> : <Navigate to='/' replace/>
    }catch(err){
        console.log(err)
    }
}

export default ProtectWNT;