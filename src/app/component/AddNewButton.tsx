import React from 'react';

const AddNewButton = ({ onClick }:any) => {
  return (
    <div className="flex flex-row justify-between items-center p-2.5 gap-2 w-[256.75px] h-[40px] bg-gradient-to-b from-[#3A3A3A] to-[#202020] rounded-lg flex-none order-2 self-stretch flex-grow-0">
      <button onClick={onClick} className="flex flex-row items-center gap-2">
        <span className="flex font-inter font-normal text-[14px] leading-[19px] text-[#E3E1E1]">
          Add new
        </span>
        <span>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.75 12H12.75M12.75 12H18.75M12.75 12V6M12.75 12V18" stroke="#E3E1E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default AddNewButton;
