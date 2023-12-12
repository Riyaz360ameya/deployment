"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import { Toaster, toast } from 'sonner';

function page() {
    const [password, setPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email:'',
        password:''
    })
    const leadRegister = async(e) => {
      e.preventDefault()
      try {
        const response  = await axios.post("/api/teamLead/login",user)
        console.log(response)
        toast.success("Login successfully")
        
      } catch (error) {
        console.log(error)
        toast.error("Login failed! Please check your credentials")
      }
    }
  return (
    <div className='h-screen bg-black text-center flex items-center justify-end'>

    <img
        src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a436d5b115b2f0001334968_AffordableHousing.jpg"
        alt=""
        className='w-full h-full object-cover'
    />

    <div className='absolute md:w-[40%] p-5'>
        <div className='border border-gray-400 rounded-md p-5 mr-10'>
            <div className='flex items-center gap-5 justify-center'>
                <img
                    className='h-16'
                    src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png"
                    alt=""
                />
                <h1 className='text-2xl font-bold mb-4'>Team Lead</h1>
            </div>
            {!password ? (
                <>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="email">Email</label>
                        <input
                            type="text"
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md 
                                `}
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="password">Password</label>
                        <input
                            type="password"
                            className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md 
                                `}
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' onClick={leadRegister}>
                            {loading ? <BeatLoader color='white' /> : 'Login'}
                        </button>
                    </div>
                    <div className=' mt-5 text-sm'>
                        <p className='text-black underline font-bold cursor-pointer' >
                            Forgot Password
                        </p>
                    </div>
                    <div className=' mt-5 text-sm'>
                        <p className='text-black font-bold underline cursor-pointer'>
                            Need a new Account? <Link href='/rolebased/teamLead/register'><span className='font-bold cursor-pointer text-black'>Register</span></Link>
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className='text-left text-sm'>
                        <label className='font-bold' htmlFor="email">Email</label>
                        <input
                            type="text"
                            className='w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md'
                            name="email"
                            id="email"
                        />
                    </div>
                    <div className='flex justify-between mt-5 text-sm'>
                        <p className='text-black font-bold underline cursor-pointer'>Resend OTP</p>
                        <p className='text-black font-bold underline cursor-pointer' >
                            Cancel
                        </p>
                    </div>
                </>
            )}
        </div>
    </div>
</div>
  )
}

export default page