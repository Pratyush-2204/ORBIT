import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

const CreateTask = ({ employees: propEmployees, setEmployees: setParentEmployees, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDate: "",
    taskAssign: "",
    taskCategory: "",
    taskDesc: "",
    taskPriority: "Medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employees, setEmployees] = useState([]);
  
  const authData = useContext(AuthContext);
  
  // Debug logging
  console.log('AuthData in CreateTask:', authData);
  console.log('Employees array:', authData?.employees);
  console.log('Employees length:', authData?.employees?.length);

  // Use employees from props or fallback to context/localStorage
  useEffect(() => {
    if (propEmployees && propEmployees.length > 0) {
      setEmployees(propEmployees);
    } else if (authData?.employees) {
      setEmployees(authData.employees);
    } else {
      // Fallback to direct localStorage access
      const data = JSON.parse(localStorage.getItem('employees'));
      if (data && Array.isArray(data)) {
        setEmployees(data);
      }
    }
  }, [propEmployees, authData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!formData.taskTitle.trim() || !formData.taskAssign.trim() || !formData.taskDate.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const taskToAdd = { 
      ...formData, 
      taskTitle: formData.taskTitle.trim(),
      taskDesc: formData.taskDesc.trim(),
      taskCategory: formData.taskCategory.trim(),
      active: false, 
      newTask: true, 
      failed: false, 
      completed: false 
    };
    
    const data = JSON.parse(localStorage.getItem("employees"));
    let taskAdded = false;
    
    data.forEach(emp => {
      if (emp.firstName === formData.taskAssign.trim()) {
        emp.tasks.push(taskToAdd);
        emp.taskCounts.newTask++;
        taskAdded = true;
        console.log('Task added to employee:', emp);
      }
    });
    
    if (!taskAdded) {
      alert("Employee not found");
      setIsSubmitting(false);
      return;
    }
    
    localStorage.setItem('employees', JSON.stringify(data));
    
    // Update parent state if setParentEmployees is provided
    if (setParentEmployees) {
      setParentEmployees(data);
    }
    
    // Call the callback to refresh the UI
    if (onTaskCreated) {
      onTaskCreated();
    }
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ 
        taskTitle: "", 
        taskDate: "", 
        taskAssign: "", 
        taskCategory: "", 
        taskDesc: "", 
        taskPriority: "Medium" 
      });
      alert("Task created successfully!");
    }, 1000);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none";

  // Show loading if no data available
  if (!authData && employees.length === 0) {
    return (
      <div className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 mt-8 rounded-2xl shadow-2xl">
        <div className="text-white text-center">Loading employees data...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 mt-8 rounded-2xl shadow-2xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Create New Task
        </h2>
        <p className="text-gray-300 text-sm">Assign tasks to your team members</p>
        
        {/* Debug info */}
        <div className="mt-2 text-xs text-gray-400">
          Debug: Auth Data: {authData ? 'Loaded' : 'Not Loaded'} | 
          Employees Available: {employees.length} | 
          Context Employees: {authData?.employees?.length || 0}
        </div>
      </div>
      
      <form onSubmit={submitHandler} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Task Title <span className="text-red-400">*</span>
              </label>
              <input 
                name="taskTitle" 
                value={formData.taskTitle} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="Enter task title..." 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Due Date <span className="text-red-400">*</span>
              </label>
              <input 
                name="taskDate" 
                type="date" 
                value={formData.taskDate} 
                onChange={handleChange} 
                className={inputClass}
                required
              />
            </div>
          </div>
          
          {/* Assign & Category */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Assign To <span className="text-red-400">*</span>
              </label>
              <select 
                name="taskAssign" 
                value={formData.taskAssign} 
                onChange={handleChange} 
                className={inputClass}
                required
              >
                <option value="">Select employee...</option>
                {employees.length > 0 ? (
                  employees.map((emp, i) => (
                    <option key={i} value={emp.firstName} className="bg-gray-800">
                      {emp.firstName} {emp.lastName || ''}
                    </option>
                  ))
                ) : (
                  <option value="" disabled className="bg-gray-800">No employees found</option>
                )}
              </select>
              {employees.length === 0 && (
                <p className="text-red-400 text-xs mt-1">No employees available. Check localStorage data.</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Category</label>
              <input 
                name="taskCategory" 
                value={formData.taskCategory} 
                onChange={handleChange} 
                className={inputClass} 
                placeholder="design, dev, testing..." 
              />
            </div>
          </div>
          
          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Priority</label>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High'].map(priority => (
                <button 
                  key={priority} 
                  type="button" 
                  onClick={() => setFormData({...formData, taskPriority: priority})}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    formData.taskPriority === priority
                      ? `${priority === 'High' ? 'bg-red-600 shadow-red-600/30' : 
                           priority === 'Medium' ? 'bg-yellow-600 shadow-yellow-600/30' : 
                           'bg-green-600 shadow-green-600/30'} text-white shadow-lg scale-105`
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Description & Submit */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
            <textarea 
              name="taskDesc" 
              value={formData.taskDesc} 
              onChange={handleChange} 
              rows={8}
              className={`${inputClass} resize-none`} 
              placeholder="Describe the task in detail..." 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting || !formData.taskTitle.trim() || !formData.taskAssign.trim() || !formData.taskDate.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 
                       hover:from-blue-700 hover:to-purple-700 
                       disabled:from-gray-600 disabled:to-gray-600
                       text-white font-semibold py-4 px-6 rounded-xl
                       transition-all duration-300 transform hover:scale-[1.02]
                       hover:shadow-xl hover:shadow-blue-500/25
                       focus:ring-4 focus:ring-blue-500/30 outline-none
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Task...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Task
              </span>
            )}
          </button>
          
          {/* Employee List Debug */}
          {employees.length > 0 && (
            <div className="bg-gray-800/30 border border-gray-600/50 rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Available Employees ({employees.length})</h4>
              <div className="text-xs text-gray-400 space-y-1">
                {employees.slice(0, 3).map((emp, i) => (
                  <div key={i}>{emp.firstName} {emp.lastName || ''}</div>
                ))}
                {employees.length > 3 && <div>+ {employees.length - 3} more...</div>}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
