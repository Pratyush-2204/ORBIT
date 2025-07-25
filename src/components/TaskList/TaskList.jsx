import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({data}) => {
  // console.log(data);
  return (
    <div
      id="tasklist"
      className="h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5  mt-10"
    >
      {data.tasks.map((elem, idx) => {
        // Ensure elem exists and has the expected properties
        // if (!elem) return null;
        

        if (elem.active) {
          return <AcceptTask key={idx} data={elem} />
        }
        if (elem.newTask) {
          return <NewTask key={idx} data={elem} />
        }
        if (elem.completed) {
          return <CompleteTask key={idx} data={elem} />
        }
        if (elem.failed) {
          return <FailedTask key={idx} data={elem} />
        }
        return null

        // return (
        //   <React.Fragment key={idx}>
        //     {elem.active && <AcceptTask key={`active-${idx}`} task={elem} />}
        //     {elem.newTask && <NewTask key={`new-${idx}`} task={elem} />}
        //     {elem.completed && <CompleteTask key={`complete-${idx}`} task={elem} />}
        //     {elem.failed && <FailedTask key={`failed-${idx}`} task={elem} />}
        //   </React.Fragment>
        // );
      })}
    </div>
  );
};

export default TaskList;
