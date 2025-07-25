import React, { useState, useEffect } from "react";
import CreateTask from "../../other/CreateTask";
import AdminTaskCard from "../TaskList/AdminTaskCard";

const AdminDashboard = ({ changeUser }) => {
  const [employees, setEmployees] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);
    const timer = setInterval(() => setCurrentTime(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const refreshEmployees = () =>
    setEmployees(JSON.parse(localStorage.getItem("employees")) || []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    changeUser(null);
  };

  /* ── STATUS → BORDER COLOR ──────────────────────── */
  const getCardClasses = (task) => {
    const status = task.active ? "inprogress" : task.completed ? "completed" : task.failed ? "failed" : "newtask";
    const map = {
      newtask: "border-yellow-400",
      completed: "border-green-400", 
      failed: "border-red-400",
      inprogress: "border-blue-400"
    };
    return map[status] || "border-white/30";
  };

  /* ── BADGE INFO ──────────────────────────────── */
  const getBadgeInfo = (task) => {
    const status = task.active ? "In Progress" : task.completed ? "Completed" : task.failed ? "Failed" : "New Task";
    const styles = {
      "New Task": "bg-yellow-500 text-white font-bold shadow-lg",
      "Completed": "bg-green-500 text-white font-bold shadow-lg",
      "Failed": "bg-red-500 text-white font-bold shadow-lg", 
      "In Progress": "bg-blue-500 text-white font-bold shadow-lg"
    };
    return { status, style: styles[status] };
  };

  /* ── PRIORITY HELPERS - FIXED TO SHOW CORRECT PRIORITY ────────────────────────── */
  const getPriorityInfo = (priority) => {
    // Ensure we get the actual priority or default to 'low'
    const actualPriority = priority?.toLowerCase() || 'low';
    
    const priorityMap = {
      urgent: { label: "URGENT", bgClass: "bg-red-600", textClass: "text-white font-extrabold" },
      high: { label: "HIGH", bgClass: "bg-orange-500", textClass: "text-white font-extrabold" },
      medium: { label: "MEDIUM", bgClass: "bg-yellow-500", textClass: "text-gray-900 font-extrabold" },
      low: { label: "LOW", bgClass: "bg-green-500", textClass: "text-white font-extrabold" }
    };
    
    return priorityMap[actualPriority] || priorityMap.low;
  };

  /* ── STATS ───────────────────────────────────── */
  const totalTasks = employees.reduce((t, e) => t + (e.tasks?.length || 0), 0);
  const completedTasks = employees.reduce((t, e) => t + (e.tasks?.filter(task => task.completed)?.length || 0), 0);

  const Stat = ({ v, label, color }) => (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-center">
      <div className={`text-2xl font-bold ${color} mb-1`}>{v}</div>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  );

  const Empty = ({ icon, msg }) => (
    <div className="bg-gray-800/30 border border-gray-600/50 rounded-xl p-4 text-center">
      <svg className="w-8 h-8 mx-auto mb-2 opacity-50 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
      </svg>
      <p className="text-gray-400 text-sm">{msg}</p>
    </div>
  );

  /* ── FIXED TASK CARD WITH PRIORITY IN TOP-LEFT CORNER ─────────────────────── */
  const TaskWrapper = ({ task }) => {
    const { status, style } = getBadgeInfo(task);
    const priorityInfo = getPriorityInfo(task.taskPriority || task.priority);

    // Calculate days until due date
    const getDaysUntilDue = (dateString) => {
      if (!dateString) return null;
      const today = new Date();
      const dueDate = new Date(dateString);
      const timeDiff = dueDate.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const daysUntilDue = getDaysUntilDue(task.taskDate || task.date);

    return (
      <div className="relative h-full flex flex-col text-white">
        {/* Priority Badge - MOVED TO TOP-LEFT CORNER */}
        <div className="absolute -top-2 -left-2 z-20">
          <div className={`${priorityInfo.bgClass} px-3 py-1 rounded-lg shadow-lg border border-white/20`}>
            <span className={`${priorityInfo.textClass} text-xs font-black tracking-wide`}>
              {priorityInfo.label}
            </span>
          </div>
        </div>

        {/* Status Badge - MOVED TO TOP-RIGHT CORNER */}
        <span className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-black z-10 ${style} border border-white/20`}>
          {status}
        </span>

        {/* Card Content - ADDED TOP MARGIN TO PREVENT OVERLAP */}
        <div className="flex-grow mt-8 mb-3">
          <AdminTaskCard task={task} />
        </div>

        {/* Due Date Section - MOVED TO BOTTOM */}
        {(task.taskDate || task.date) && (
          <div className="bg-gray-800/80 rounded-lg p-3 mt-auto border border-gray-600/50 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="font-black text-white text-sm tracking-wide drop-shadow-lg">
                  Due: <span className="font-black text-yellow-200">{task.taskDate || task.date}</span>
                </span>
              </div>
              
              {daysUntilDue !== null && (
                <span className={`px-3 py-1 rounded-md text-xs font-black tracking-wide shadow-lg border-2 ${
                  daysUntilDue < 0 ? 'bg-red-600 text-white border-red-400 shadow-red-500/50' :
                  daysUntilDue === 0 ? 'bg-orange-600 text-white border-orange-400 shadow-orange-500/50' :
                  daysUntilDue <= 3 ? 'bg-yellow-600 text-white border-yellow-400 shadow-yellow-500/50' :
                  'bg-green-600 text-white border-green-400 shadow-green-500/50'
                }`}>
                  {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d OVERDUE` :
                   daysUntilDue === 0 ? 'DUE TODAY!' :
                   `${daysUntilDue}d LEFT`}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                {getGreeting()}, Admin! 👋
              </h1>
              <p className="text-gray-300">Welcome to your dashboard.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xl font-bold text-white">{currentTime.toLocaleDateString()}</div>
                <div className="text-gray-300 text-sm">{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Stat v={employees.length} label="Total Employees" color="text-blue-400" />
            <Stat v={totalTasks} label="Total Tasks" color="text-purple-400" />
            <Stat v={completedTasks} label="Completed Tasks" color="text-green-400" />
          </div>
        </div>

        {/* Create Task */}
        <CreateTask employees={employees} setEmployees={setEmployees} onTaskCreated={refreshEmployees} />

        {/* Task Lists */}
        {employees.length ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Tasks Overview
            </h2>

            <div className="space-y-6">
              {employees.map((emp, ei) => (
                <div key={ei}>
                  {/* Employee Header */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                        {emp.firstName?.[0]?.toUpperCase()}{emp.lastName?.[0]?.toUpperCase()}
                      </span>
                      {emp.firstName} {emp.lastName}
                    </h3>
                    <span className="text-gray-300 text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                      {emp.tasks?.length || 0} task{(emp.tasks?.length || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Task Carousel */}
                  {emp.tasks?.length ? (
                    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                      {emp.tasks.map((task, ti) => (
                        <div
                          key={`${ei}-${ti}`}
                          className={`
                            flex-none w-72 h-64
                            bg-white/10 backdrop-blur-md border-2 ${getCardClasses(task)}
                            rounded-lg p-4 text-white
                            transition-all duration-200 hover:scale-102 hover:shadow-lg
                          `}
                          style={{ flexBasis: "288px" }}
                        >
                          <TaskWrapper task={task} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Empty icon="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" msg="No tasks assigned yet" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <Empty icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 919.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" msg="No employees found" />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
