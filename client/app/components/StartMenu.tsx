import React, { useState } from 'react';
import { PiLockKey, PiPower } from 'react-icons/pi';
import { VscAccount, VscRefresh } from 'react-icons/vsc';

type App = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

type BackgroundOption = {
  id: number;
  url: string;
  name: string;
  preview: string; // Preview image url
};

type Props = {
  apps: App[];
  backgrounds: BackgroundOption[];
  changeBackground: (url: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isVisible: boolean;
  selectedBackground: string;
};

function StartMenu({
  apps,
  backgrounds,
  changeBackground,
  isOpen,
  onClose,
  isVisible,
  selectedBackground,
}: Props) {
  const [currentBackground, setCurrentBackground] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUrl = event.target.value;
    changeBackground(selectedUrl);
  };

  const prevBackground = () => {
    setCurrentBackground((current) =>
      current === 0 ? backgrounds.length - 1 : current - 1
    );
  };

  const nextBackground = () => {
    setCurrentBackground((current) =>
      current === backgrounds.length - 1 ? 0 : current + 1
    );
  };

  const [isLocked, setIsLocked] = useState(false);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-14 left-2 h-[650px] w-[300] rounded-lg overflow-hidden bg-gray-900 bg-opacity-60 backdrop-blur-lg shadow-lg text-white p-6 flex flex-col z-20
          ${isOpen ? 'open-start-menu' : 'close-start-menu'}
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex flex-row w-full h-14 items-center justify-between space-x-2 space-x-reverse'>
            <div className='flex flex-row items-center space-x-2'>
              <VscAccount className='w-8 h-8' />
              <h2 className='text-xl font-bold'>My Portfolio</h2>
            </div>
            <div className='flex flex-row space-x-2'>
              <button
                className='bg-transparent hover:bg-gray-600 p-2 rounded-lg'
                title='Power Off'
              >
                <PiPower size={'2rem'} />
              </button>
              <button
                className='bg-transparent hover:bg-gray-600 p-2 rounded-lg'
                title='Restart'
              >
                <VscRefresh size={'2rem'} />
              </button>
              <button
                className='bg-transparent hover:bg-gray-600 p-2 rounded-lg'
                title='Lock Screen'
              >
                <PiLockKey size={'2rem'} />
              </button>
            </div>
          </div>
          {/* Top Left - Change Background Section 
          <div className='flex flex-row space-x-8 items-center justify-start'>
            <div className='flex flex-col md:flex'>
              <div className='relative w-72 flex items-center justify-center'>
                <button
                  className='absolute left-0 px-2 py-12 bg-gray-800 hover:bg-gray-700 rounded-lg'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent StartMenu from closing on click
                    prevBackground();
                  }}
                >
                  ◀
                </button>

                <div className='overflow-hidden w-52 h-32 rounded-lg relative'>
                  <img
                    src={backgrounds[currentBackground].preview}
                    alt={backgrounds[currentBackground].name}
                    className='w-full h-full object-cover'
                  />
                  <button
                    className='absolute inset-0 bg-transparent'
                    onClick={(e) => {
                      e.stopPropagation();
                      changeBackground(backgrounds[currentBackground].url);
                    }}
                  />
                </div>

                <button
                  className='absolute right-0 px-2 py-12 bg-gray-800 hover:bg-gray-700 rounded-lg'
                  onClick={(e) => {
                    e.stopPropagation();
                    nextBackground();
                  }}
                >
                  ▶
                </button>
              </div>
              <h1 className='text-base font-extralight self-center py-1'>
                Background
              </h1>
            </div>
          </div>*/}

          {/* Apps Section 
          <div className='px-2'>
            <div className='mt-8 grid grid-cols-5 gap-6 p-6'>
              {apps.map((app) => (
                <div
                  key={app.id}
                  className='flex flex-col items-center justify-center space-y-2 p-4 cursor-pointer'
                  style={{ width: '80px' }}
                >
                  <div
                    className='w-12 h-12 flex items-center justify-center rounded-full'
                    style={{ width: '64px', height: '64px' }}
                  >
                    {app.icon}
                  </div>
                  <span className='text-center text-sm'>{app.name}</span>
                </div>
              ))}
            </div>
          </div>*/}

          <div className='flex flex-row space-x-8 p-1'>
            {/* Applications List */}
            <div className='flex flex-col items-start  rounded-lg min-w-56'>
              <h2 className='text-lg font-bold mb-2'>Applications</h2>
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-blue-500' />
                  <span>My Computer</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-blue-500' />
                  <span>Control Panel</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-blue-500' />
                  <span>Notepad</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-blue-500' />
                  <span>Paint</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-blue-500' />
                  <span>Calculator</span>
                </div>
              </div>
            </div>

            {/* Folders List */}
            <div className='flex flex-col items-start  rounded-lg min-w-56'>
              <h2 className='text-lg font-bold mb-2'>Folders</h2>
              <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-yellow-500' />
                  <span>Documents</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-yellow-500' />
                  <span>Pictures</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-yellow-500' />
                  <span>Music</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-yellow-500' />
                  <span>Videos</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <VscAccount className='w-8 h-8 text-yellow-500' />
                  <span>Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StartMenu;
