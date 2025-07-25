import React from 'react'

const TaskListNumbers = ({data}) => {
  // Calculate actual task counts from tasks array to ensure accuracy
  const actualCounts = {
    newTask: data.tasks?.filter(task => task.newTask && !task.active && !task.completed && !task.failed).length || 0,
    active: data.tasks?.filter(task => task.active).length || 0,
    completed: data.tasks?.filter(task => task.completed).length || 0,
    failed: data.tasks?.filter(task => task.failed).length || 0
  };

  const cards = [
    {
      title: "New Tasks",
      count: actualCounts.newTask,
      icon: "✨",
      bgClass: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadowClass: "shadow-blue-500/30",
      textColor: "text-white"
    },
    {
      title: "Completed",
      count: actualCounts.completed,
      icon: "✅",
      bgClass: "bg-gradient-to-br from-green-500 to-green-600",
      shadowClass: "shadow-green-500/30",
      textColor: "text-white"
    },
    {
      title: "In Progress",
      count: actualCounts.active,
      icon: "🔄",
      bgClass: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      shadowClass: "shadow-yellow-500/30",
      textColor: "text-gray-900"
    },
    {
      title: "Failed",
      count: actualCounts.failed,
      icon: "❌",
      bgClass: "bg-gradient-to-br from-red-500 to-red-600",
      shadowClass: "shadow-red-500/30",
      textColor: "text-white"
    }
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`
            ${card.bgClass} ${card.shadowClass}
            rounded-2xl p-6 shadow-xl transform transition-all duration-300 
            hover:scale-105 hover:shadow-2xl border border-white/20 backdrop-blur-sm
            cursor-pointer group
          `}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            <div className={`text-4xl font-black ${card.textColor} group-hover:scale-110 transition-transform duration-300`}>
              {card.count}
            </div>
          </div>
          <h3 className={`text-lg font-bold ${card.textColor} group-hover:text-opacity-90 transition-all duration-300`}>
            {card.title}
          </h3>
          <div className={`h-1 w-0 ${card.textColor === 'text-white' ? 'bg-white/30' : 'bg-gray-900/30'} group-hover:w-full transition-all duration-500 mt-2 rounded-full`}></div>
        </div>
      ))}
    </div>
  )
}

export default TaskListNumbers