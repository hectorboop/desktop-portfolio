import React from 'react';
import { FaWindows } from 'react-icons/fa';
import { FcHome } from 'react-icons/fc';

type Props = {};

function TaskBar({}: Props) {
  return (
    <div className='fixed bottom-0 left-0 right-0 h-12 w-auto bg-gray-800 text-white flex justify-between items-center px-4 shadow-md bg-opacity-50 backdrop-blur-md'>
      {/* Start Button */}
      <div className='flex items-center space-x-3'>
        <button className='bg-gray-700 hover:bg-gray-600 p-2 rounded-full'>
          <FaWindows className='w-5 h-5' />
        </button>
        {/* Pinned Apps (just icons) */}
        <button className='hover:bg-gray-700 p-2 rounded-full'>
          <FcHome className='w-5 h-5' />
        </button>
        {/* Add more icons as needed */}
      </div>
    </div>
  );
}

export default TaskBar;
