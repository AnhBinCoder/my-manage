import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../authConfig/AuthConext'
type Props = {
    children?: any
}
export default function Protected({children} : Props) {
    const {user} = UserAuth();
    if(!user){
      return <Navigate to='/'/>
    }
  return children;
}