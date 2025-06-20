import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(){
    const [content,setcontent]=useState([])
    useEffect(()=>{
axios.get("http://localhost:3000/api/v1/content",{
    headers:{
        token:localStorage.getItem('token')
    }
}).then((response)=>{
    setcontent(response.data.content)
})
    },[])
    return content
}