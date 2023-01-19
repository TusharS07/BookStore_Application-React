import React, { useEffect, useState } from 'react'
import './Pagination.css';

const Pagination = ({showPerPages, onPagination, totalPage }) => {

    const [count,setCount]=useState(1);

    useEffect(()=>{
      const value =showPerPages*count;
      onPagination(value-showPerPages,value);
    },[count])

    
   const onButtonClick=(type)=>{
     if(type==="prev"){
       if(count===1){
         setCount(1)
       }
       else{
         setCount(count-1)
       }
     }
     else if(type==="next"){
       if(Math.ceil(totalPage/showPerPages)===count){
         setCount(count)
       }
       else{
         setCount(count+1)
       }
 
     }
   }
 
 
   return (
   <>
   <div className='d-flex justify-content-between'>
   <button type="button" className="button" onClick={()=>onButtonClick("prev")}>...Prev</button>
   <button type="button" className="button" onClick={()=>onButtonClick("next")}>Next...</button>
   </div>
   </>
   )
}

export default Pagination