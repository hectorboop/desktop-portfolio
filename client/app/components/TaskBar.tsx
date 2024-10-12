import React, { useEffect, useState } from 'react';
import { TfiLayoutGrid3Alt } from 'react-icons/tfi';

import Gradients from '../components/Gradients';

import {
  PiBatteryPlusVertical,
  PiBluetooth,
  PiCellSignalFull,
  PiSpeakerHigh,
} from 'react-icons/pi';

import { taskbarApps } from '../utilities/appData';
import { OpenWindow } from '../utilities/types';
import { FaFileAlt } from 'react-icons/fa';

type Props = {
  theme: string;
  toggleStartMenu: () => void;
  isDisabled: boolean;
  isStartMenuOpen: boolean;
  toggleAppWindow: (id: number) => void;
  appWindows: OpenWindow[];
};

function TaskBar({
  toggleStartMenu,
  isDisabled,
  isStartMenuOpen,
  toggleAppWindow,
  appWindows,
}: //
Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update Date
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const [temperature, setTemperature] = useState(0);
  const [error, setError] = useState('');

  // Function to fetch weather data
  const fetchWeather = async (latitude: any, longitude: any) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(Math.round(data.current_weather.temperature));
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to fetch weather data');
    }
  };

  // Get user's location using Geolocation API
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude); // Fetch weather using user's location
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Location access denied');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Get user's location on mount and periodically update weather data
  useEffect(() => {
    // Initial fetch on mount
    getUserLocation();

    // Set up interval to fetch weather data every 5 minutes
    const intervalId = setInterval(() => {
      getUserLocation(); // Fetch weather again using user's location
    }, 300000); // 300,000 ms = 5 minutes

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className='fixed bottom-0 left-0 right-0 h-12 w-full bg-blue-950 bg-opacity-0 backdrop-blur-none flex flex-row  items-center justify-center'>
      <Gradients />
      <div className='fixed bottom-0 left-0 right-96 h-12 w-auto  flex justify-between items-center px-4'>
        {/* Start Button */}
        <div className='flex items-center space-x-2'>
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

          {/* Pinned Icons first */}
          {taskbarApps.map((app) => {
            // Check if the app window is open by comparing titles or ids
            const isOpen = appWindows.some(
              (appWindow) => appWindow.id === app.id
            );

            return (
              <button
                key={app.id}
                className={`p-2 rounded-none ${
                  isOpen
                    ? 'bg-gray-800 border-b-4 border-blue-500' // Highlight when open
                    : 'hover:bg-gray-700'
                }`}
                title={app.name}
                onClick={() => {
                  toggleAppWindow(app.id);
                }}
              >
                {React.createElement(app.icon, {
                  className: 'w-8 h-8',
                  style: { fill: `url(#${app.gradient})` },
                })}
              </button>
            );
          })}

          {/* Open Windows - Only show windows that are not pinned */}
          {appWindows.map((appWindow) => {
            const isPinned = taskbarApps.some((app) => app.id === appWindow.id);

            // Only render the icon if it is not already pinned
            if (!isPinned) {
              // Check if the window is open and apply the same style as pinned
              const isOpen = appWindows.some(
                (window) => window.id === appWindow.id
              );

              return (
                <button
                  key={appWindow.id}
                  className={`p-2 rounded-none ${
                    isOpen
                      ? 'bg-gray-800 border-b-4 border-blue-500' // Same styling for open windows
                      : 'hover:bg-gray-700'
                  }`}
                  title={appWindow.title}
                  onClick={() => {
                    toggleAppWindow(appWindow.id);
                  }}
                >
                  {React.cloneElement(appWindow.icon, {
                    className: 'w-8 h-8',
                    style: { fill: `url(#gradient-13)` },
                  })}
                </button>
              );
            }

            return null;
          })}
        </div>
      </div>

      <div className='fixed left-0 flex items-center text-white px-1 space-x-0 h-full'></div>
      <div className='fixed right-0 flex items-center text-white px-1 space-x-0'>
        <div className='flex flex-row items-end space-x-2 pl-4 px-4 '>
          <div className='text-5xl sofia text-blue-100'>
            {error
              ? error
              : temperature !== null
              ? `${temperature}°C`
              : 'Loading...'}
          </div>

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
            <PiBatteryPlusVertical
              className='w-8 h-8 hover:brightness-75 transition duration-150'
              style={{ fill: 'url(#gradient-13)' }}
            />
          </div>
          <div className='flex items-center  border-gray-600 py-2'>
            <PiBluetooth
              className='w-8 h-8 hover:brightness-75 transition duration-150'
              style={{ fill: 'url(#gradient-13)' }}
            />
          </div>
          <div className='flex items-center  border-gray-600 py-2'>
            <PiCellSignalFull
              className='w-8 h-8 hover:brightness-75 transition duration-150'
              style={{ fill: 'url(#gradient-13)' }}
            />
          </div>
          <div className='flex items-center border-gray-600 py-2'>
            <PiSpeakerHigh
              className='w-8 h-8 hover:brightness-75 transition duration-150'
              style={{ fill: 'url(#gradient-13)' }}
            />
          </div>

          <div className='text-5xl font-light sofia text-white'>
            {currentDate.toLocaleDateString([], {
              //weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className='text-5xl font-bold sofia bg-gradient-to-r from-teal-700 to-teal-400 bg-clip-text text-transparent'>
            {currentDate.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
        </div>
      </div>

      {/*<div
        className={`${
          isFileExplorerOpen
            ? 'fixed overflow-auto bottom-12 left-0 right-0 h-screen w-screen bg-gray-800 bg-opacity-90 flex flex-col justify-center items-center'
            : ''
        }`}
      >
        {isFileExplorerOpen && <FileExplorer onClose={toggleFileExplorer} />}
      </div>*/}
    </div>
  );
}

export default React.memo(TaskBar);
