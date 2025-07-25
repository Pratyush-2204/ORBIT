import React from 'react'

const NewTask = ({data, onTaskUpdate}) => {
  
  const handleAcceptTask = () => {
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
            active: true,
            newTask: false,
            completed: false,
            failed: false
          }
          
          // Update task counts
          employees[employeeIndex].taskCounts.newTask -= 1
          employees[employeeIndex].taskCounts.active += 1
          
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
    <div className="flex-shrink-0 p-5 h-full w-[300px] bg-blue-400 rounded-xl shadow-lg border-2 border-blue-500">
    <div className="flex justify-between items-center">
      <h3 className="bg-red-600 px-3 py-1 text-sm rounded text-white font-semibold">{data.category}</h3>
      <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md border border-white/30">
        <h4 className="text-xs font-medium text-white">{data.taskDate}</h4>
      </div>
    </div>
    
      <h2 className="mt-5 text-2xl font-semibold text-white">{data.taskTitle}</h2>
      <p className="text-sm mt-2 text-white">
        {data.taskDescription}
      </p>
      <div className='mt-6'>
        <button 
          onClick={handleAcceptTask}
          className='w-full bg-yellow-500 hover:bg-yellow-600 hover:shadow-xl text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-yellow-500/25 border-2 border-yellow-600 hover:border-yellow-700 active:scale-95 cursor-pointer'
        >
          Accept Task
        </button>
      </div>
  </div>
  )
}

export default NewTask
