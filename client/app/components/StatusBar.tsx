import React, { useEffect, useState } from 'react';
import { FaWifi, FaBatteryFull } from 'react-icons/fa';
import { HiMiniSpeakerWave } from 'react-icons/hi2';

type Props = {
  setSelectedBackground: (url: string) => void;
  backgroundOptions: { id: number; url: string; name: string }[];
};

function StatusBar({ setSelectedBackground, backgroundOptions }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

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
    <div className='fixed top-0 left-0 right-0 flex justify-between items-center p-2 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-md h-8'>
      <div className='text-white px-4'>
        <select
          id='background-select'
          className='text-sm font-thin bg-inherit text-white px-2 py-1 rounded hover:bg-gray-600 transition'
          onChange={handleChange}
        >
          {backgroundOptions.map((option) => (
            <option key={option.id} value={option.url}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex items-center text-white px-1 space-x-0'>
        <div className='flex items-center  border-gray-600 pr-4'>
          <FaWifi className='w-5 h-5' />
        </div>
        <div className='flex items-center border-gray-600 pr-4'>
          <HiMiniSpeakerWave className='w-5 h-5' />
        </div>
        <div className='flex items-center  border-gray-600 pr-4'>
          <FaBatteryFull className='w-5 h-5' />
        </div>
        <div className='flex items-center text-white px-4 space-x-4'>
          <div className='flex items-center space-x-2 pl-4 '>
            <div className='text-sm font-thin border-r border-gray-600 pr-4'>
              {dateString}
            </div>
            <div className='text-sm font-thin'>{timeString}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(StatusBar);
