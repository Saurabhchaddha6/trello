import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import PropTypes from 'prop-types';

const CardComponent = ({ index, title, description, priority, dueDate, createdAt, id }) => {
  console.log('Rendering CardComponent:', { id, index, title });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-[#FF6B6B]';
      case 'Medium': return 'bg-[#FFA235]';
      case 'Low': return 'bg-[#0ECC5A]';
      default: return 'bg-white';
    }
  };

  const getTimeElapsed = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diff = now - createdTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  return (
    
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="box-border flex flex-col items-start p-[14px_13px] gap-4 w-[256.75px] h-[231px] bg-[#F9F9F9] border border-[#DEDEDE] rounded-lg flex-none order-1 self-stretch flex-grow-0"
        >
          <div className="flex flex-col items-start p-0 gap-[13px] w-[230.75px] h-[170px] flex-none order-0 self-stretch flex-grow-0">
            <div className="flex flex-col items-start p-0 gap-[12px] w-[230.75px] h-[93px] flex-none order-0 self-stretch flex-grow-0">
              <div className="w-[230.75px] h-[38px] font-inter font-medium text-[16px] leading-[19px] text-[#606060] flex-none order-0 self-stretch flex-grow-0">
                {title}
              </div>
              <div className="w-[230.75px] h-[51px] font-inter font-normal text-[14px] leading-[17px] text-[#797979] flex-none order-1 self-stretch flex-grow-0">
                {description}
              </div>
              <div className={`flex flex-row justify-center items-center p-[6px_8px] gap-[10px] w-[55px] h-[27px] ${getPriorityColor(priority)} rounded-lg flex-none order-1 flex-grow-0`}>
                <div className="w-[39px] h-[15px] font-inter font-normal text-[11px] whitespace-nowrap leading-[15px] text-[#FFFFFF] flex-none order-0 flex-grow-0">
                  {priority}
                </div>
              </div>
              <div className="flex flex-row items-center p-0 gap-[8px] w-[115px] h-[24px] flex-none order-2 flex-grow-0">
                <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V12H18" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-[83px] h-[17px] font-inter font-medium text-[12px] leading-[17px] text-[#606060] flex-none order-1 flex-grow-0">
                  {dueDate}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center p-0 gap-[212px] w-[230.75px] h-[17px] flex-none order-1 self-stretch flex-grow-0">
            <div className="w-[53px] h-[17px] font-inter font-medium text-[12px] leading-[17px] text-[#797979] flex-none order-0 flex-grow-0 whitespace-nowrap">
              {getTimeElapsed(createdAt)}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

CardComponent.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardComponent;