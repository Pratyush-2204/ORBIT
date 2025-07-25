import React from 'react'

const AcceptTask = ({data, onTaskUpdate}) => {
  
  const handleMarkCompleted = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (loggedInUser && loggedInUser.data) {
      const employees = JSON.parse(localStorage.getItem('employees')) || []
      const employeeIndex = employees.findIndex(emp => emp.email === loggedInUser.data.email)
      
      if (employeeIndex !== -1) {
        const taskIndex = employees[employeeIndex].tasks.findIndex(task => 
          task.taskTitle === data.taskTitle && task.taskDate === data.taskDate
        )
        
        if (taskIndex !== -1) {
          // Update task status
          employees[employeeIndex].tasks[taskIndex] = {
            ...employees[employeeIndex].tasks[taskIndex],
            active: false,
            newTask: false,
            completed: true,
            failed: false
          }
          
          // Update task counts
          employees[employeeIndex].taskCounts.active -= 1
          employees[employeeIndex].taskCounts.completed += 1
          
          // Save to localStorage
          localStorage.setItem('employees', JSON.stringify(employees))
          
          // Update logged in user data
          localStorage.setItem('loggedInUser', JSON.stringify({
            role: 'employee',
            data: employees[employeeIndex]
          }))
          
          // Trigger update callback
          if (onTaskUpdate) {
            onTaskUpdate(employees[employeeIndex])
          }
        }
      }
    }
  }

  const handleMarkFailed = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (loggedInUser && loggedInUser.data) {
      const employees = JSON.parse(localStorage.getItem('employees')) || []
      const employeeIndex = employees.findIndex(emp => emp.email === loggedInUser.data.email)
      
      if (employeeIndex !== -1) {
        const taskIndex = employees[employeeIndex].tasks.findIndex(task => 
          task.taskTitle === data.taskTitle && task.taskDate === data.taskDate
        )
        
        if (taskIndex !== -1) {
          // Update task status
          employees[employeeIndex].tasks[taskIndex] = {
            ...employees[employeeIndex].tasks[taskIndex],
            active: false,
            newTask: false,
            completed: false,
            failed: true
          }
          
          // Update task counts
          employees[employeeIndex].taskCounts.active -= 1
          employees[employeeIndex].taskCounts.failed += 1
          
          // Save to localStorage
          localStorage.setItem('employees', JSON.stringify(employees))
          
          // Update logged in user data
          localStorage.setItem('loggedInUser', JSON.stringify({
            role: 'employee',
            data: employees[employeeIndex]
          }))
          
          // Trigger update callback
          if (onTaskUpdate) {
            onTaskUpdate(employees[employeeIndex])
          }
        }
      }
    }
  }

  return (
    <div className="flex-shrink-0 p-5 h-full w-[300px] bg-yellow-400 rounded-xl shadow-lg border-2 border-yellow-500">
    <div className="flex justify-between items-center">
      <h3 className="bg-red-600 px-3 py-1 text-sm rounded text-white font-semibold">{data.category}</h3>
      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/30">
        <h4 className="text-xs font-medium text-gray-800">{data.taskDate}</h4>
      </div>
    </div>
      <h2 className="mt-5 text-2xl font-semibold text-gray-800">{data.taskTitle}</h2>
      <p className="text-sm mt-2 text-gray-700">
        {data.taskDescription}
      </p>
      <div className='flex justify-between mt-6 gap-2'>
        <button 
          onClick={handleMarkCompleted}
          className='bg-green-600 hover:bg-green-700 hover:shadow-xl text-sm text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-green-500/25 flex-1 active:scale-95 cursor-pointer'
        >
          Mark as Completed
        </button>
        <button 
          onClick={handleMarkFailed}
          className='bg-red-600 hover:bg-red-700 hover:shadow-xl text-sm text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-red-500/25 flex-1 active:scale-95 cursor-pointer'
        >
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask
