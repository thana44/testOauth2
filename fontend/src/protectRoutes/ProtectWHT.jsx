import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const ProtectWHT = ()=>{
    try{
        const ptauth = Cookies.get('PTauth')
        return ptauth? <Outlet/> : <Navigate to='/login' replace/>
    }catch(err){
        console.log(err)
    }
}

export default ProtectWHT;