import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaLink } from "react-icons/fa6";
import { FiAlertOctagon } from "react-icons/fi";
import { PiChatDotsLight } from "react-icons/pi";
import { InfinitySpin } from 'react-loader-spinner'

const Leads = ({ loading, setLoading }) => {
  const [show, setShow] = useState("")
  const [allTasks, setAllTasks] = useState([])
  const teamLeadTasks = async () => {
    const { data } = await axios.get('/api/projectManager/allTasks')
    console.log(data, "-------------")
    setAllTasks(data.tasks)
    setShow("Interior")
    setLoading(false)
  }
  useEffect(() => {
    teamLeadTasks()
  }, [])
  const handleShow = (designation) => {
    console.log(designation)
    setShow(designation)
  }
  return (
    <>
      {loading ?
        <div className='h-full flex items-center justify-center '>
          <div>
            <InfinitySpin
              width='200'
              color="black"
            />
            </div>
        </div>
        :
        <div className='p-2 h-full overflow-hidden overflow-y-scroll w-full overflow-x-hidden' >

          <div className='flex items-center gap-5'>
            {
              allTasks.map((item, i) => {
                return (
                  <div onClick={() => handleShow(item.teamLeadId.designation)} className='cursor-pointer'>
                    <h1 className='text-2xl font-bold bg-slate-500 text-white p-5 rounded'> {item.teamLeadId.designation} Team</h1>
                  </div>
                )
              })
            }
          </div>
          {
            allTasks.map((item, i) => {
              if (show === item.teamLeadId.designation) {
                return (
                  <div>
                    <h1 key={i} className='text-lg font-bold p-2'>{item.teamLeadId.designation} Team Lead</h1>
                    <div className=''>
                      {/* <h1 className='text-xl p-2'>Projects</h1> */}
                      <div className='flex gap-4 ml-2'>
                        <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
                          <p>New Task</p>
                        </div>
                        <div className="py-2 px-8 hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
                          <p>Ongoing</p>
                        </div>
                        <div className="py-2 px-8  hover:bg-indigo-100 text-indigo-700 rounded-full shadow-xl">
                          <p>Completed</p>
                        </div>
                      </div>
                    </div>
                    <div className='border shadow mt-4 max-w-[100%] overflow-x-auto'>
                      <table className="w-full whitespace-nowrap shadow p-3 ">
                        <tbody>
                          <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded shadow-xl">
                            <th className='border'>No</th>
                            <th className='border'>Select</th>
                            <th className='border'>Project Title</th>
                            <th className='border'>Project Number</th>
                            <th className='border'>Importance</th>
                            <th className='border'>Comments</th>
                            <th className='border'>Deadline</th>
                            <th className='border'>Status</th>
                            <th className='border'>Options</th>
                          </tr>
                          <tr className='h-5'></tr>
                          {
                            item.newTasks.map((item, i) => {
                              return (
                                <>
                                  <tr key={i} className='text-center mt-10 shadow-xl'>
                                    <td className='border'>{i + 1}</td>
                                    <td className='text-center h-10 border'>
                                      <div className='flex items-center justify-center'>
                                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                          <input placeholder="checkbox" type="checkbox" className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full " />
                                        </div>
                                      </div>
                                    </td>
                                    <td className="border">
                                      <div className="flex items-center gap-2  ml-5">
                                        <FaLink color='blue' />
                                        <p className="text-base font-medium  text-gray-700 ">{item.projectTitle}</p>
                                      </div>
                                    </td>
                                    <td className=" border">
                                      <p>55</p>
                                    </td>
                                    <td className="border">
                                      <div className="flex items-center justify-center">
                                        <FiAlertOctagon color='red' />
                                        <p className="text-sm text-gray-600 ml-2">Urgent</p>
                                      </div>
                                    </td>
                                    {/* <td className='text-center border'>Tony Stark</td> */}
                                    <td className=' border'>
                                      <div className='flex items-center justify-center'><PiChatDotsLight />2 msg</div>
                                    </td>
                                    <td className='bg-red-200 rounded text-red-600 border'>{item.endDate}</td>
                                    <td>New Task</td>
                                    <td className=' border'>
                                      <div className='flex gap-2 items-center justify-center'>
                                        <button className='px-3 bg-blue-600 text-white rounded'>E</button>
                                        <button className='px-3 bg-red-600 text-white rounded'>D</button>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      }
    </>
  )
}
export default Leads