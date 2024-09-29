'use client';
import React, { useState, useEffect } from 'react';
import TaskBar from '../components/TaskBar';
import StatusBar from '../components/StatusBar';
import { preloadImages } from '../utilities/preloadImages';

import StartMenu from '../components/StartMenu';
import {
  FaChrome,
  FaFile,
  FaCalculator,
  FaWater,
  FaMountain,
  FaSun,
} from 'react-icons/fa'; // Example icons

type Props = {};

function Desktop({}: Props) {
  // Define your list of background images
  const backgroundOptions = [
    {
      id: 1,
      url: '/images/seaside.jpg',
      name: 'Seaside',
      preview: '/images/seaside.jpg',
    },
    {
      id: 2,
      url: '/images/mountains.jpg',
      name: 'Mountains',
      preview: '/images/mountains.jpg',
    },
    {
      id: 3,
      url: '/images/lake.jpg',
      name: 'Lake',
      preview: '/images/lake.jpg',
    },
    {
      id: 4,
      url: '/images/forest.jpg',
      name: 'Forest',
      preview: '/images/forest.jpg',
    },
  ];

  // State to track the currently selected background
  const [selectedBackground, setSelectedBackground] = useState(
    backgroundOptions[0].url
  );

  const apps = [
    { id: 1, name: 'Browser', icon: <FaChrome size={'4em'} /> },
    { id: 2, name: 'Files', icon: <FaFile size={'4em'} /> },
    { id: 3, name: 'Calculator', icon: <FaCalculator size={'4em'} /> },
    // Add more apps as necessary
  ];

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isStartMenuVisible, setIsStartMenuVisible] = useState(false);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);

  const toggleStartMenu = () => {
    if (isAnimationRunning) return;

    setIsAnimationRunning(true);

    if (isStartMenuOpen) {
      setTimeout(() => {
        setIsStartMenuOpen(false);
      }, 220);
    } else {
      setIsStartMenuOpen(true);
    }
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  // Handle the open/close transitions
  useEffect(() => {
    if (isStartMenuOpen) {
      setIsStartMenuVisible(true);
    } else {
      // Delay hiding the element until after the close animation finishes (0.25s)
      setTimeout(() => setIsStartMenuVisible(false), 220);
    }

    setTimeout(() => setIsAnimationRunning(false), 220);
  }, [isStartMenuOpen]);

  useEffect(() => {
    // Preload the images
    const imageUrls = backgroundOptions.map((option) => option.url);
    preloadImages(imageUrls);
  }, []);

  useEffect(() => {
    // Load the persisted background from localStorage if it exists
    const storedBackground = localStorage.getItem('selectedBackground');
    if (storedBackground) {
      setSelectedBackground(storedBackground);
    }
  }, []);

  const handleBackgroundChange = (imageUrl: string) => {
    setSelectedBackground(imageUrl);
    localStorage.setItem('selectedBackground', imageUrl); // Save the selected background to localStorage
  };

  return (
    <div className='flex flex-col items-center justify-center relative w-full h-screen overflow-hidden'>
      <div className='h-8'>
        <StatusBar
          setSelectedBackground={setSelectedBackground}
          backgroundOptions={backgroundOptions}
        />
      </div>

      <div className='fixed bottom-0 top-8 left-0 right-0 over w-screen h-screen overflow-hidden'>
        {/* Background image */}
        <div
          className={`absolute inset-0 bg-cover bg-center background-image-transition ${
            selectedBackground ? 'background-image-visible' : ''
          }`}
          style={{ backgroundImage: `url(${selectedBackground})` }}
        />
        {/* Optional: Desktop content here */}
        <div className='absolute inset-0 flex items-center justify-center text-white'>
          <h1 className='text-4xl font-bold'>Welcome to Your Desktop</h1>
        </div>

        {/* Full-screen Start Menu */}
        <StartMenu
          apps={apps}
          isOpen={isStartMenuOpen}
          onClose={toggleStartMenu}
          isVisible={isStartMenuVisible}
          backgrounds={backgroundOptions}
          changeBackground={handleBackgroundChange}
          selectedBackground={selectedBackground}
        />
      </div>

      <div className='h-12'>
        <TaskBar
          toggleStartMenu={toggleStartMenu}
          isDisabled={isAnimationRunning}
        />
      </div>
    </div>
  );
}

export default Desktop;
