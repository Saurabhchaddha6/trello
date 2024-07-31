import React, { useEffect, useState, useCallback } from "react";
import CardComponent from "./CardComponent";
import AddNewButton from "./AddNewButton";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ toggleAddTask }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('/api/task');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const statusList = ['To-Do', 'In Progress', 'Under Review', 'Finished'];

  const categorizeTasks = useCallback((status) =>
    tasks.filter(task => task.status === status),
  [tasks]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    console.log('Drag ended:', { destination, source, draggableId });
    console.log("Destination droppableId:", destination.droppableId);
    console.log("Source droppableId:", source.droppableId);
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const updatedTasks = [...tasks];
    const movedTaskIndex = updatedTasks.findIndex(task => task._id === draggableId);
    if (movedTaskIndex === -1) {
      console.error('Task not found:', draggableId);
      return;
    }

    const [movedTask] = updatedTasks.splice(movedTaskIndex, 1);
    movedTask.status = destination.droppableId;

    const newIndex = destination.index;
    updatedTasks.splice(newIndex, 0, movedTask);

    console.log('Updated task:', movedTask);
    setTasks(updatedTasks);

    try {
      await axios.put(`/api/task/${movedTask._id}`, movedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      setTasks(tasks); // Revert to the previous state if the API call fails
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-row items-start p-4 gap-4 w-full h-full bg-white rounded-lg">
        {statusList.map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided, snapshot) => (
              <div
                className="flex flex-col items-start p-0 gap-4 w-1/4 h-full"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex flex-row justify-between items-center p-0 gap-4 w-full h-[24px]">
                  <div className="text-[#555555] text-[20px] font-inter font-normal leading-[24px]">
                    {status}
                  </div>
                  <div className="w-[24px] h-[24px]">
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.75 5H11.75M3.75 12H16.75M3.75 19H21.75" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                {categorizeTasks(status).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardComponent
                          id={task._id}
                          index={index}
                          title={task.title}
                          description={task.description}
                          priority={task.priority}
                          dueDate={task.dueDate}
                          createdAt={task.createdAt}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <AddNewButton onClick={toggleAddTask}/>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskCard;
