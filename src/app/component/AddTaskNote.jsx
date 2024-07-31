import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const AddTaskNote = ({onClose,isVisible}) => {


    const {data: session} = useSession();
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isAnimating, setIsAnimating] = useState(isVisible);


    useEffect(() => {
    if (isVisible) {
      setIsAnimating(true); // Start the animation
      if (taskId) {
        fetchTaskDetails();
      }
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Match duration with animation
      return () => clearTimeout(timer);
    }
  }, [isVisible,]);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`/api/task/${taskId}`);
      if (response.status === 200) {
        const task = response.data;
        setTitle(task.title);
        setStatus(task.status);
        setPriority(task.priority);
        setDeadline(task.deadline);
        setDescription(task.description);
      }
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  const handleClose = () => {
    console.log("close button clicked")
    onClose();
  };

  const handleTaskNote = async () => {
    if (!title || !status) {
      setError("Title and status are required");
      return;
    }

    const task = {
      title,
      description,
      status,
      priority: priority || undefined,
      deadline,
      updatedAt: Date.now()
    };

    try {
      let response;
      if (taskId) {
        // Update existing task
        response = await axios.put(`/api/task/${taskId}`, task);
      } else {
        // Create new task
        response = await axios.post('/api/task', task);
      }

      if (response.status !== 200) {
        throw new Error('Failed to save task note');
      }

      console.log('Task Note saved successfully');
    } catch (error) {
      console.error('Error saving task note:', error);
    }
  };


    return (
     
        <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg shadow-lg rounded-lg p-6 transform transition-transform duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}`}
    >
        <div className="fixed right-0 top-0 w-[400px] h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
            <div className="flex flex-col h-full">
            <div className="flex flex-col items-start px-6 py-8 gap-8 absolute w-[670px] h-[495px] left-0 top-4">
                <div className="flex flex-col items-start p-0 gap-[27px] w-[622px] h-[411px] flex-none order-0 flex-grow-0">
                    <div className="flex flex-row justify-between items-center p-0 gap-[316px] w-[622px] h-[40px] flex-none order-0 self-stretch flex-grow-0">
                        <div className="flex flex-row items-center p-0 gap-4 w-[64px] h-[24px] flex-none order-0 flex-grow-0">
                            <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                <button onClick={handleClose}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.7583 17.2426L12.0009 12M12.0009 12L17.2435 6.75732M12.0009 12L6.7583 6.75732M12.0009 12L17.2435 17.2426" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                </button>
                            </div>
                            <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.75 9.75L18 18M18 18V10.08M18 18H10.08" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.25 14.25L6 6M6 6V13.92M6 6H13.92" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-row items-center p-0 gap-4 w-[230px] h-[40px] flex-none order-1 flex-grow-0">
                            <div className="flex flex-row items-center p-2 gap-[14px] w-[98px] h-[40px] bg-[#F4F4F4] rounded-md flex-none order-0 flex-grow-0">
                                <div className="w-[44px] h-[19px] text-[#797979] text-base font-normal leading-[19px] flex-none order-0 flex-grow-0">Share</div>
                                <div className="w-[24px] h-[24px] flex-none order-1 flex-grow-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.5 6.5L8.5 10.5" stroke="#797979" strokeWidth="1.5" />
                                        <path d="M8.5 13.5L15.5 17.5" stroke="#797979" strokeWidth="1.5" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex flex-row items-center p-2 gap-[14px] w-[116px] h-[40px] bg-[#F4F4F4] rounded-md flex-none order-1 flex-grow-0">
                                <div className="w-[62px] h-[19px] text-[#797979] text-base font-normal leading-[19px] flex-none order-0 flex-grow-0">Favorite</div>
                                <div className="w-[24px] h-[24px] flex-none order-1 flex-grow-0">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#797979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start p-0 gap-[38px] w-[622px] h-[344px] flex-none order-1 self-stretch flex-grow-0">
                        <div className="flex flex-col items-start p-0 gap-[16px] w-[622px] h-[250px] flex-none order-1 self-stretch flex-grow-0">
                            <input
                                className="w-[622px] h-[58px] text-[#CCCCCC] text-[48px] font-semibold leading-[58px] flex-none order-0 self-stretch flex-grow-0"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                            />
                            <div className="flex flex-row items-start p-0 gap-[60px] w-[622px] h-[192px] flex-none order-1 self-stretch flex-grow-0">
                                <div className="flex flex-col items-start p-0 gap-[32px] w-[136px] h-[192px] flex-none order-0 flex-grow-0">
                                    <div className="flex flex-row items-center p-0 gap-[24px] w-[97px] h-[24px] flex-none order-0 flex-grow-0">
                                        <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2V6" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 18V22" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 12H18" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6 12H2" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.9292 4.92896L7.75762 7.75738" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16.2427 16.2427L19.0711 19.0711" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M19.0711 4.92896L16.2427 7.75738" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M7.75713 16.2427L4.92871 19.0711" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        </div>
                                        <div className="w-[73px] h-[24px] text-[#797979] text-base font-normal leading-[24px] flex-none order-1 flex-grow-0">Status</div>
                                    </div>
                                    <div className="flex flex-row items-center p-0 gap-[24px] w-[97px] h-[24px] flex-none order-1 flex-grow-0">
                                        <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_42_503)">
                                            <path d="M11.5757 1.42427C11.81 1.18996 12.1899 1.18996 12.4243 1.42427L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42427 12.4243C1.18996 12.19 1.18996 11.8101 1.42427 11.5757L11.5757 1.42427Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 8V12" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 16.0099L12.01 15.9988" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </g>
                                            <defs>
                                            <clipPath id="clip0_42_503">
                                            <rect width="24" height="24" fill="white"/>
                                            </clipPath>
                                            </defs>
                                            </svg>
                                        </div>
                                        <div className="w-[80px] h-[24px] text-[#797979] text-base font-normal leading-[24px] flex-none order-1 flex-grow-0">Priority</div>
                                    </div>
                                    <div className="flex flex-row items-center p-0 gap-[24px] w-[97px] h-[24px] flex-none order-2 flex-grow-0">
                                        <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M7 2V6" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="w-[80px] h-[24px] text-[#797979] text-base font-normal leading-[24px] flex-none order-1 flex-grow-0">Deadline</div>
                                    </div>
                                    <div className="flex flex-row items-center p-0 gap-[24px] w-[97px] h-[24px] flex-none order-3 flex-grow-0">
                                        <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.3631 5.65147L15.843 4.17148C16.6241 3.39043 17.8904 3.39043 18.6715 4.17148L20.0857 5.5857C20.8667 6.36674 20.8667 7.63307 20.0857 8.41412L18.6057 9.89411M14.3631 5.65147L4.74742 15.2671C4.41535 15.5992 4.21072 16.0375 4.1694 16.5053L3.92731 19.2458C3.87254 19.8658 4.39141 20.3847 5.01143 20.3299L7.75184 20.0878C8.21965 20.0465 8.658 19.8418 8.99007 19.5098L18.6057 9.89411M14.3631 5.65147L18.6057 9.89411" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        </div>
                                        <div className="w-[104px] h-[24px] text-[#797979] text-base font-normal leading-[24px] flex-none order-1 flex-grow-0">Description</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center p-0 gap-[32px] w-[97px] h-[192px] flex-none order-1 flex-grow-0">
                                    <select
                                        className="w-[97px] h-[24px] font-inter text-[16px] leading-[24px] text-[#C1BDBD] flex-none order-0 self-stretch flex-grow-0"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Not Selected</option>
                                        <option value="To-Do">To-Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Under Review">Under Review</option>
                                        <option value="Finished">Finished</option>
                                    </select>
                                    <select
                                    className="w-[97px] h-[24px] text-[#C1BDBD] text-[14px] font-normal leading-[24px] flex-none order-0 self-stretch flex-grow-0"
                                    value={priority}  // Controlled component
                                    onChange={(e) => setPriority(e.target.value || undefined)}  // Set undefined for empty selection
                                >
                                    <option value="">Not Selected</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                                    <input
                                        className="w-[97px] h-[24px] text-[#C1BDBD] text-[14px] font-normal leading-[24px] flex-none order-0 self-stretch flex-grow-0"
                                        type="date"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                    />
                                    <textarea
                                        className="w-[97px] h-[24px] text-[#C1BDBD] text-[14px] font-normal leading-[24px] flex-none order-0 self-stretch flex-grow-0"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Description"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center p-0 gap-[23px] w-[208px] h-[24px] flex-none order-1 flex-grow-0">
                            <div className="w-[24px] h-[24px] flex-none order-0 flex-grow-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12H12M12 12H18M12 12V6M12 12V18" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>

                            </div>
                            <div className="w-[161px] h-[19px] text-[#000000] text-[15px] font-normal leading-[19px] flex-none order-1 flex-grow-0">Add custom property</div>
                        </div>
                    </div>
                </div>
                <div className="w-[622px] h-[1px] bg-[#DEDEDE] flex-none order-1 self-stretch flex-grow-0"></div>
                <div className="w-[622px] h-[19px] text-[#797979] text-base font-normal leading-[19px] flex-none order-2 self-stretch flex-grow-0">
                
                </div>
                <button
                    className="w-[622px] h-[40px] bg-[#0061F2] rounded-lg text-white text-base font-semibold flex-none order-3 self-stretch flex-grow-0"
                    onClick={handleTaskNote}
                >
                    Add Task Note
                </button>
            </div>
        </div>
        </div>
        </div>
    );
};

export default AddTaskNote;
