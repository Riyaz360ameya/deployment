"use client"
import React, { useEffect } from 'react'
import Tasks from '../../components/Tasks'
import { devAllTasks, verifierTasks } from '../../devApis/taskApi'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { developerCompletedTasks, developerNewTasks, developerOngoingTasks } from '@/app/redux/developer/developerProSlice'

function NewTasks() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userDetails);
  const designation = user.designation
  console.log(designation, '-------------designation')
  const developerTasks = async () => {
    const { data } = designation === "File Verifier" ? await verifierTasks() : await devAllTasks()
    console.log(data.devTasks, '---------------data')
    dispatch(developerNewTasks(data.devTasks?.newTasks))
    dispatch(developerOngoingTasks(data.devTasks?.onGoingTasks))
    dispatch(developerCompletedTasks(data.devTasks?.completedTasks))
  }
  useEffect(() => {
    developerTasks()
  }, [])
  // const devNewTasks = useSelector((state) => state.developerTasks.developerNewTasks);
  // console.log(devNewTasks, '---------------------devNewTasks')
  return (
    <div>
      <Tasks />
    </div>
  )
}

export default NewTasks