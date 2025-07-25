import React from "react";

const AdminTaskCard = ({ task }) => {
  const getStatusColor = (task) => {
    if (task.completed) return 'bg-green-500/30 text-green-200 border-green-400/50';
    if (task.failed) return 'bg-red-500/30 text-red-200 border-red-400/50';
    if (task.active) return 'bg-blue-500/30 text-blue-200 border-blue-400/50';
    if (task.newTask) return 'bg-purple-500/30 text-purple-200 border-purple-400/50';
    return 'bg-gray-500/30 text-gray-200 border-gray-400/50';
  };

  const getStatusText = (task) => {
    if (task.completed) return 'Completed';
    if (task.failed) return 'Failed';
    if (task.active) return 'In Progress';
    if (task.newTask) return 'New';
    return 'Unknown';
  };

  return (
    <div className="h-full flex flex-col px-1">
      {/* Task Title - Made more bold and visible, with proper spacing */}
      <div className="mb-3">
        <h3 className="text-base font-black text-white leading-tight break-words">
          {task.taskTitle}
        </h3>
      </div>
      
      <div className="space-y-2 flex-grow">
        {task.taskCategory && (
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-xs font-bold text-white break-words">
              <span className="text-gray-300">Category:</span> {task.taskCategory}
            </span>
          </div>
        )}
        
        {task.taskDesc && (
          <div className="mt-2 pt-2 border-t border-gray-600/30">
            <p className="text-xs font-semibold text-gray-200 line-clamp-2 break-words">
              {task.taskDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTaskCard;