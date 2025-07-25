import React from "react";

const Header = ({data = { firstName: 'User' }, changeUser}) => {

  const logOutUser = () => {
    localStorage.setItem('loggedInUser','')
    changeUser('')
    // window.location.reload()
  }

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl font-medium text-white">
        Hello <br /> <span className="text-3xl  font-semibold">{data.firstName}👋</span>
      </h1>
      <button onClick={logOutUser} className="bg-red-600 text-lg font-medium text-white px-5 py-2 rounded-sm cursor-pointer">
        Log Out
      </button>
    </div>
  );
};

export default Header;
