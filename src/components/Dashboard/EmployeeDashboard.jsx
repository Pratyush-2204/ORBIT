import React, { useState, useEffect } from "react";
import Header from "../../other/Header";
import TaskListNumbers from "../../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = (props) => {
  const [employeeData, setEmployeeData] = useState(props.data);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Refresh employee data from localStorage to get new tasks
  useEffect(() => {
    const refreshData = () => {
      setIsRefreshing(true);
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const updatedEmployee = employees.find(emp => emp.email === props.data.email);
      if (updatedEmployee) {
        setEmployeeData(updatedEmployee);
        setLastRefresh(new Date());
      }
      setTimeout(() => setIsRefreshing(false), 500); // Show refresh animation
    };

    // Initial refresh
    refreshData();

    // Set up interval to refresh every 3 seconds for better responsiveness
    const dataRefreshInterval = setInterval(refreshData, 3000);
    
    // Update time every minute
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 60000);

    return () => {
      clearInterval(dataRefreshInterval);
      clearInterval(timeInterval);
    };
  }, [props.data.email]);

  // Manual refresh function
  const handleManualRefresh = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const updatedEmployee = employees.find(emp => emp.email === props.data.email);
    if (updatedEmployee) {
      setEmployeeData(updatedEmployee);
      setLastRefresh(new Date());
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-10">
        {/* Enhanced Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {getGreeting()}, {employeeData.firstName}! 👋
                </h1>
                {isRefreshing && (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                )}
              </div>
              <p className="text-gray-300 text-sm lg:text-base mb-2">
                Ready to tackle your tasks today? Let's make it productive!
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Last updated: {lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Manual Refresh Button */}
              <button
                onClick={handleManualRefresh}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                title="Refresh tasks"
              >
                <svg className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  {currentTime.toLocaleDateString()}
                </div>
                <div className="text-gray-300 text-sm">
                  {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  localStorage.removeItem('loggedInUser');
                  props.changeUser(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Task Numbers */}
        <TaskListNumbers data={employeeData} />
        
        {/* Enhanced Task List */}
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Your Tasks
              <span className="text-sm font-normal text-gray-400">
                ({employeeData.tasks?.length || 0} total)
              </span>
            </h2>
            <TaskList data={employeeData}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
