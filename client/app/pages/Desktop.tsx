'use client';
import React, { useState } from 'react';
import TaskBar from '../components/TaskBar';
import StatusBar from '../components/StatusBar';

type Props = {};

function Desktop({}: Props) {
  // Define your list of background images
  const backgroundOptions = [
    { id: 1, url: '/images/seaside.jpg', name: 'Seaside' },
    { id: 2, url: '/images/background2.jpg', name: 'Mountains' },
    { id: 3, url: '/images/background3.jpg', name: 'Cityscape' },
    { id: 4, url: '/images/background4.jpg', name: 'Beach' },
  ];

  // State to track the currently selected background
  const [selectedBackground, setSelectedBackground] = useState(
    backgroundOptions[0].url
  );

  // Handler to change the background
  const handleBackgroundChange = (imageUrl: string) => {
    setSelectedBackground(imageUrl);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='relative w-full h-screen overflow-hidden'>
        {/* Background image */}
        <div
          className='absolute inset-0 bg-cover bg-center z-0'
          style={{ backgroundImage: `url(${selectedBackground})` }}
        />

        {/* Optional: Desktop content here */}
        <div className='absolute inset-0 flex items-center justify-center text-white z-10'>
          <h1 className='text-4xl font-bold'>Welcome to Your Desktop</h1>
        </div>

        {/* Ensure that StatusBar and TaskBar are positioned above */}
        <div className='absolute inset-0 z-20'>
          <StatusBar
            setSelectedBackground={setSelectedBackground}
            backgroundOptions={backgroundOptions}
          />
          <TaskBar />
        </div>
      </div>
    </div>
  );
}

export default Desktop;
