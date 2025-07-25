import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const AllTask = () => {
    const [userData] = useContext(AuthContext)

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">All Tasks</h2>
            <div className="space-y-4">
                {userData && userData.map((employee) => (
                    <div key={employee.id} className="bg-[#1c1c1c] p-4 rounded">
                        <h3 className="text-lg font-medium text-white mb-3">
                            {employee.firstName}'s Tasks
                        </h3>
                        <div className="space-y-3">
                            {employee.tasks.map((task, index) => (
                                <div key={index} className="bg-[#2c2c2c] p-3 rounded">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-white font-medium">{task.taskTitle}</h4>
                                            <p className="text-gray-400 text-sm mt-1">{task.taskDescription}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="bg-blue-500 text-xs px-2 py-1 rounded">
                                                {task.category}
                                            </span>
                                            <p className="text-gray-400 text-xs mt-2">Due: {task.taskDate}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        {task.newTask && (
                                            <span className="text-xs bg-blue-400 px-2 py-0.5 rounded">New</span>
                                        )}
                                        {task.active && (
                                            <span className="text-xs bg-yellow-400 px-2 py-0.5 rounded">Active</span>
                                        )}
                                        {task.completed && (
                                            <span className="text-xs bg-green-400 px-2 py-0.5 rounded">Completed</span>
                                        )}
                                        {task.failed && (
                                            <span className="text-xs bg-red-400 px-2 py-0.5 rounded">Failed</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllTask