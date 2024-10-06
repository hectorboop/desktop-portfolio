import React, { useEffect, useState } from 'react';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';
import { FcHome } from 'react-icons/fc';
import { FaBatteryFull, FaBluetooth, FaEthernet, FaWifi } from 'react-icons/fa';
import { HiMiniSpeakerWave } from 'react-icons/hi2';
import { FiCheck, FiFilm } from 'react-icons/fi';

import Gradients from '../components/Gradients';

import {
  PiBatteryPlusVerticalThin,
  PiBluetoothThin,
  PiCellSignalFull,
  PiCellSignalFullThin,
  PiFolders,
  PiSpeakerHighThin,
} from 'react-icons/pi';
import { SiVisualstudiocode } from 'react-icons/si';
import { BiFolder, BiLogoChrome, BiLogoVisualStudio } from 'react-icons/bi';
import FileExplorer from './FileExplorer';

const gradients = ['gradient-1', 'gradient-2', 'gradient-3']; // List of gradient IDs
// Randomly pick a gradient
const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

type Props = {
  toggleStartMenu: () => void;
  isDisabled: boolean;
  isStartMenuOpen: boolean;
};

function TaskBar({ toggleStartMenu, isDisabled, isStartMenuOpen }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const gradientId = getRandomGradient(); // Get random gradient for each icon

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);

  const toggleFileExplorer = () => {
    setIsFileExplorerOpen(!isFileExplorerOpen);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 h-12 w-full bg-blue-950 bg-opacity-0 backdrop-blur-none flex flex-row  items-center justify-center'>
      <Gradients />
      <div className='fixed bottom-0 left-0 right-96 h-12 w-auto  flex justify-between items-center px-4'>
        {/* Start Button */}
        <div className='flex items-center space-x-3'>
          <div className='flex flex-col items-center size-12'>
            <button
              className={`p-2 rounded-none text-white transition transform hover:scale-105 active:scale-95 duration-150 ease-out ${
                isStartMenuOpen ? 'bg-gray-700' : ' '
              }  `}
              aria-label='Open Start Menu'
              onClick={!isDisabled ? toggleStartMenu : () => {}}
              disabled={isDisabled}
            >
              <TfiLayoutGrid3Alt
                className='w-8 h-7'
                style={{ fill: 'url(#start-menu-icon-gradient)' }}
              />
            </button>
            {isStartMenuOpen && (
              <div className='flex bottom-0 h-1 w-full bg-blue-500 rounded-none'></div>
            )}
          </div>

          {/* Pinned Apps (just icons) */}
          <button
            className='hover:bg-gray-700 p-2 rounded-none'
            aria-label='File Explorer'
            onClick={toggleFileExplorer}
          >
            <BiFolder
              className='w-8 h-8'
              style={{ fill: `url(#gradient-2)` }}
            />
          </button>
          <button className='hover:bg-gray-700 p-2 rounded-none'>
            <BiLogoChrome
              className='w-8 h-8 text-blue-400'
              style={{ fill: `url(#gradient-8)` }}
            />
          </button>
          <button className='hover:bg-gray-700 p-2 rounded-none'>
            <BiLogoVisualStudio
              className='w-8 h-8 text-blue-400'
              style={{ fill: `url(#gradient-3)` }}
            />
          </button>
          <button className='hover:bg-gray-700 p-2 rounded-sm'>
            <PiFolders
              className='w-8 h-8 text-blue-400'
              style={{ fill: `url(#gradient-2)` }}
            />
          </button>
          <button className='hover:bg-gray-700 p-2 rounded-sm'>
            <PiFolders
              className='w-8 h-8 text-blue-400'
              style={{ fill: `url(#gradient-2)` }}
            />
          </button>
          <button className='hover:bg-gray-700 p-2 rounded-sm'>
            <PiFolders
              className='w-8 h-8 text-blue-400'
              style={{ fill: `url(#gradient-2)` }}
            />
          </button>
          {/* Add more icons as needed */}
        </div>
      </div>

      <div className='fixed left-0 flex items-center text-white px-1 space-x-0 h-full'></div>
      <div className='fixed right-0 flex items-center text-white px-1 space-x-0'>
        <div className='flex flex-row items-end space-x-2 pl-4 px-4 '>
          <div className='text-5xl sofia text-blue-100'>25°C</div>

          <div className='flex items-center space-x-2'>
            <div className='flex items-center'>
              {currentDate.getHours() >= 6 && currentDate.getHours() < 18 ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-8 h-8 text-yellow-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M7.757 16.243l-2.121 2.121M16.243 16.243l2.121 2.121M7.757 7.757l2.121-2.121'
                  />
                  <circle cx='12' cy='12' r='5' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-8 h-8 text-blue-400'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.752 15.002A9.718 9.718 0 0112.003 21C6.477 21 2 16.523 2 11c0-4.02 2.375-7.493 5.811-9.016a.75.75 0 01.93.906A8.251 8.251 0 0012.003 19.5c3.477 0 6.443-2.147 7.503-5.204a.75.75 0 011.4.464l-.154.242z'
                  />
                </svg>
              )}
            </div>
          </div>

          <div className='flex items-center  border-gray-600 py-2'>
            <PiBatteryPlusVerticalThin
              //style={{ fill: 'url(#blue-gradient)' }}
              className='w-8 h-8'
            />
          </div>
          <div className='flex items-center  border-gray-600 py-2'>
            <PiBluetoothThin className='w-8 h-8 ' />
          </div>
          <div className='flex items-center  border-gray-600 py-2'>
            <PiCellSignalFullThin className='w-8 h-8 ' />
          </div>
          <div className='flex items-center border-gray-600 py-2'>
            <PiSpeakerHighThin className='w-8 h-8' />
          </div>

          <div className='text-5xl font-light sofia text-blue-300'>
            {currentDate.toLocaleDateString([], {
              //weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className='text-5xl font-bold sofia text-blue-400'>
            {currentDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
        </div>
      </div>
      <div className='fixed bottom-12 left-0 right-0 h-full w-full bg-gray-800 bg-opacity-90 flex flex-col justify-center items-center z-10'>
        {isFileExplorerOpen && <FileExplorer onClose={toggleFileExplorer} />}
      </div>
    </div>
  );
}

export default React.memo(TaskBar);
