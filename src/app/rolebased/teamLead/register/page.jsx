"use client"
import React,{useState} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Toaster, toast } from 'sonner';
import axios from 'axios';
function page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })
    const teamRegister = async(e) => {
        e.preventDefault()
       try {
        const response = await axios.post("/api/teamLead/register",user)
        console.log(response)
        toast.success("Registered successfully")
        router.push("/rolebased/teamLead/login")
       } catch (error) {
        console.log(error)
        toast.error("failed to register!")
       }

    }
  return (
    <div className='h-screen bg-white text-center flex items-center justify-end'>
    <img src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a436d5b115b2f0001334968_AffordableHousing.jpg" alt="" className='w-full h-full object-cover' />
    <div className='absolute md:w-[40%] p-5'>
       <div className='border border-gray-400 rounded-md p-5 mr-10 shadow-2xl'>
       <div className='flex items-center gap-5 justify-center'>
                <img className='h-16' src="https://uploads-ssl.webflow.com/5a4347c1115b2f0001333231/5a460b2980557a00017cac78_logonav.png" alt="" />
                <h1 className='text-2xl font-bold mb-4'>Team Lead</h1>
            </div>
            <div className='flex justify-between gap-2'>
            <div className='text-left text-sm w-1/2'>
                                <label className='font-bold' htmlFor="firstName">First Name</label>
                                <input
                                    type='text'
                                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md `}
                                    value={user.firstName}
                                    id='firstName'
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                    required
                                />
                               
                            </div>
                <div className='text-left text-sm w-1/2'>
                    <label className='font-bold' htmlFor="lastName">Last Name</label>
                    <input
                        type='text'
                        className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md`}
                        id='lastName'
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className='text-left text-sm'>
                <label className='font-bold' htmlFor="email">Email</label>
                <input
                    type='text'
                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md`}
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
            </div>
            <div className='text-left text-sm'>
                <label className='font-bold' htmlFor="password">Password</label>
                <input
                    type='password'
                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md `}
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                />
            </div>
            <div className='text-left text-sm'>
                <label className='font-bold' htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type='password'
                    className={`w-full border border-gray-400 bg-gray-200 outline-none p-2 rounded-md`}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                    required
                />
            </div>
            <div>
                <button className='bg-gray-900 text-white rounded-md p-2 w-full mt-5 font-bold' onClick={teamRegister}>
                {loading ? <BeatLoader color='white' /> : "Register"}
                </button>
            </div>
            <div className=' mt-5'>
                <p className='text-black font-bold underline cursor-pointer'>
                    Already have an account? <Link href='/rolebased/teamLead/login'><span className='font-bold text-black'>Login</span></Link>
                </p>
            </div>
       </div>
    </div>
</div>
  )
}

export default page