"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { getDataFromToken } from '../api/helpers/getDataFromToken'
function page() {
  const router = useRouter()
  const [data, setData] = useState("empty")
 // Get the token from cookies

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout")
      localStorage.setItem('user', "")
      console.log("Logout success")
      router.push("/login")
    } catch (error) {
      console.log(error.message)
    }
  }

  const userData = getDataFromToken();
  console.log(userData,"hhhhhhhhhhhhhhh")


  // useEffect(() => {
  //   // Get the value of the 'yourCookieName' cookie
  //   const cookieValue = Cookies.get('token');

  //   // Use the cookie value as needed
  //   console.log('Cookie Value:', cookieValue);
  // }, []);
  

  //fetching user details from token
  const userDetails = async () => {
    const res = await axios.get("/api/users/userdata")
    console.log(res.data)
    setData(res.data.data._id)
  }
  return (
    <div>
      <h1>profile</h1>
      <h2>{data === "empty" ? "no data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <div className='flex justify-center items-center'>
        <button className='bg-gray-800 p-2 text-white rounded' onClick={onLogout}>Logout</button>
        <button className='bg-gray-800 p-2 text-white rounded mx-5' onClick={userDetails}>data</button>
        {userData && (
        <div>
          <p>User ID: {userData.userId}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user-related data */}
        </div>
      )}

      </div>
    </div>
  )
}

export default page
