import React from 'react'

const FailedTask = ({data}) => {
  return (
    <div className="flex-shrink-0 p-5 h-full w-[300px] bg-red-400 rounded-xl shadow-lg border-2 border-red-500">
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
            <button className='w-full bg-red-600 hover:bg-red-700 hover:shadow-xl text-white font-bold py-3 px-4 rounded-lg shadow-md border-2 border-red-700 hover:border-red-800 cursor-default transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-red-500/25'>
              ✗ Failed
            </button>
          </div>        
      </div>
  )
}

export default FailedTask
