"use client"
import React, { useEffect } from 'react'
import Tasks from '../../components/Tasks'
import { developerNewTasks } from '../../devApis/taskApi'

function NewTasks() {
  const developerTasks = async () => {
    const { data } = await developerNewTasks()
  }
  useEffect(() => {
    developerTasks()
  }, [])

  return (
    <div>
      <Tasks />

    </div>
  )
}

export default NewTasks