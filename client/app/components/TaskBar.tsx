import React from 'react';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';
import { FcHome } from 'react-icons/fc';

type Props = { toggleStartMenu: () => void; isDisabled: boolean };

function TaskBar({ toggleStartMenu, isDisabled }: Props) {
  return (
    <div className='fixed bottom-0 left-0 right-0 h-12 w-auto bg-gray-800 text-white flex justify-between items-center px-4 shadow-md bg-opacity-90 backdrop-blur-md z-0'>
      {/* Start Button */}
      <div className='flex items-center space-x-3'>
        <button
          className={`p-2 bg-gray-600 hover:bg-gray-600 rounded-sm`}
          aria-label='Open Start Menu'
          onClick={!isDisabled ? toggleStartMenu : () => {}}
          disabled={isDisabled}
        >
          <TfiLayoutGrid3Alt className='w-5 h-5' />
        </button>
        {/* Pinned Apps (just icons) */}
        <button className='hover:bg-gray-700 p-2 rounded-sm'>
          <FcHome className='w-5 h-5' />
        </button>
        {/* Add more icons as needed */}
      </div>
    </div>
  );
}

export default React.memo(TaskBar);
