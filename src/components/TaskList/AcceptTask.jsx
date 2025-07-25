import React from 'react'

const AcceptTask = ({data}) => {
  // console.log(data)
  return (
    <div className="flex-shrink-0 p-5 h-full w-[300px] bg-yellow-400 rounded-xl">
    <div className="flex justify-between items-center">
      <h3 className="bg-red-600 px-3 py-1 text-sm rounded">{data.category}</h3>
      <h4 className="text-sm">{data.taskDate}</h4>
    </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">
        {data.taskDescription}
      </p>
      <div className='flex justify-between mt-4'>
        <button className='bg-green-600 text-sm text-white px-2 py-1 rounded-md'>Mark as Completed</button>
        <button className='bg-red-600 text-sm text-white px-2 py-1 rounded-md'>Mark as Failed</button>
      </div>
    </div>
  )
}

export default AcceptTask
