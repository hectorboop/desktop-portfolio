import React from 'react';
import { FaWifi, FaBatteryFull } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';

type Props = {
  setSelectedBackground: (url: string) => void;
  backgroundOptions: { id: number; url: string; name: string }[];
};

function StatusBar({ setSelectedBackground, backgroundOptions }: Props) {
  const currentDate = new Date();
  const timeString = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = currentDate.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUrl = event.target.value;
    setSelectedBackground(selectedUrl);
  };

  return (
    <div className='fixed top-0 left-0 right-0 flex justify-between items-center p-2 bg-gray-800 bg-opacity-60 backdrop-blur-md shadow-md h-8'>
      {/* Left side of the Top Bar */}
      <div className='text-white px-4'>
        <label htmlFor='background-select' className='mr-2'>
          Change Wallpaper:
        </label>
        <select
          id='background-select'
          className='bg-inherit text-white px-2 py-1 rounded hover:bg-gray-600 transition'
          onChange={handleChange}
        >
          {backgroundOptions.map((option) => (
            <option key={option.id} value={option.url}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* Right side of the Top Bar with Bevel Separators */}
      <div className='flex items-center text-white px-4 space-x-4'>
        <div className='flex items-center space-x-2 border-r border-gray-600 pr-4'>
          <MdNotifications className='w-5 h-5' />
        </div>

        <div className='flex items-center space-x-2 border-r border-gray-600 pr-4'>
          <FaWifi className='w-5 h-5' />
        </div>
        <div className='flex items-center space-x-2 border-r border-gray-600 pr-4'>
          <FaBatteryFull className='w-5 h-5' />
        </div>

        {/* Date and Time */}
        <div className='flex items-center space-x-2 pl-4 '>
          <div>{dateString}</div>
          <div>{timeString}</div>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
