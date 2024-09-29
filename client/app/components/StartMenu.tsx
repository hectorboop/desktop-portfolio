import React, { useState } from 'react';

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

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-0 top-8 left-0 right-0 h-screen w-full overflow-hidden bg-gray-900 bg-opacity-90 backdrop-blur-lg shadow-lg text-white p-6 flex flex-col 
          ${isOpen ? 'open-start-menu' : 'close-start-menu'}
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Left - Change Background Section */}
          <div className='flex flex-col space-y-4'>
            <h2 className='text-xl font-bold'>Change Background</h2>

            {/* Image Slider */}
            <div className='relative w-3/12 flex items-center justify-center'>
              {/* Left Arrow */}
              <button
                className='absolute left-0 p-2 bg-gray-800 hover:bg-gray-700'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent StartMenu from closing on click
                  prevBackground();
                }}
              >
                ◀
              </button>

              {/* Current Image */}
              <div className='overflow-hidden w-64 h-40 rounded-lg relative'>
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

              {/* Right Arrow */}
              <button
                className='absolute right-0 p-2 bg-gray-800 hover:bg-gray-700'
                onClick={(e) => {
                  e.stopPropagation();
                  nextBackground();
                }}
              >
                ▶
              </button>

              {/* Fading on the left and right for preview effect */}
              <div className='absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none' />
              <div className='absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none' />
            </div>
          </div>

          {/* Apps Section */}
          <div className='mt-8 grid grid-cols-10 gap-6 p-6'>
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
        </div>
      )}
    </>
  );
}

export default StartMenu;
