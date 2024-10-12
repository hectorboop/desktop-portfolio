import React, { useState, useEffect } from 'react';
import {
  RiFolderCloudLine,
  RiFolderDownloadLine,
  RiFolderImageLine,
  RiFolderMusicLine,
  RiFolderVideoLine,
  RiRecycleLine,
  RiComputerLine, // Icon for "This PC"
} from 'react-icons/ri';
import { FaFileAlt } from 'react-icons/fa';
import {
  SlArrowLeft,
  SlArrowRight,
  SlArrowUp,
  SlGrid,
  SlMagnifier,
  SlReload,
  SlScreenDesktop,
} from 'react-icons/sl';
import { IoIosArrowRoundForward } from 'react-icons/io';

type Folder = {
  name: string;
  items: string[];
  icon: string; // Icon name as a string
};

// Folder data structure with "This PC" containing links to other folders
const defaultFolders: Folder[] = [
  {
    name: 'This PC',
    items: [
      'Documents',
      'Downloads',
      'Pictures',
      'Music',
      'Videos',
      'Desktop',
      'Recycle Bin',
    ], // Links to other folders
    icon: 'RiComputerLine',
  },
  {
    name: 'Documents',
    items: ['MockDocument.docx'],
    icon: 'RiFolderCloudLine',
  },
  {
    name: 'Downloads',
    items: ['MockDownload.zip'],
    icon: 'RiFolderDownloadLine',
  },
  { name: 'Pictures', items: ['MockPicture.png'], icon: 'RiFolderImageLine' },
  { name: 'Music', items: ['MockMusic.mp3'], icon: 'RiFolderMusicLine' },
  { name: 'Videos', items: ['MockVideo.mp4'], icon: 'RiFolderVideoLine' },
  { name: 'Desktop', items: ['MockShortcut.lnk'], icon: 'RiFolderCloudLine' },
  { name: 'Recycle Bin', items: ['DeletedItem.txt'], icon: 'RiRecycleLine' },
];

// Mapping icon strings to actual React components
const folderIcons = {
  RiFolderCloudLine: RiFolderCloudLine,
  RiFolderDownloadLine: RiFolderDownloadLine,
  RiFolderImageLine: RiFolderImageLine,
  RiFolderMusicLine: RiFolderMusicLine,
  RiFolderVideoLine: RiFolderVideoLine,
  RiRecycleLine: RiRecycleLine,
  RiComputerLine: RiComputerLine, // "This PC" icon
};

interface ExplorerProps {
  defaultFolderName?: string; // Optional prop to set the default folder
}

function Explorer({ defaultFolderName = 'This PC' }: ExplorerProps) {
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);

  // Set the initial folder based on the defaultFolderName prop
  useEffect(() => {
    const initialFolder = defaultFolders.find(
      (folder) => folder.name === defaultFolderName
    );
    setCurrentFolder(initialFolder || defaultFolders[0]); // Fallback to the first folder if not found
  }, [defaultFolderName]);

  // Handle folder click inside "This PC" to navigate to respective folders
  const handleItemClick = (itemName: string) => {
    const clickedFolder = defaultFolders.find(
      (folder) => folder.name === itemName
    );
    if (clickedFolder) {
      setCurrentFolder(clickedFolder);
    }
  };

  return (
    <div className='explorer flex flex-col pt-2 h-full bg-transparent text-white backdrop-blur-lg'>
      {/* Header with folder navigation */}
      <div className='header bg-transparent text-white flex flex-row items-center justify-between p-4 rounded-lg w-full h-6 '>
        <div className='flex space-x-4 '>
          <SlArrowLeft className='w-6 h-6 hover:fill-gray-600 transition duration-150' />
          <SlArrowRight className='w-6 h-6 hover:fill-gray-600 transition duration-150' />
          <SlArrowUp className='w-6 h-6 hover:fill-gray-600 transition duration-150' />
          <SlReload className='w-6 h-6 hover:fill-gray-600 transition duration-150' />
        </div>

        {currentFolder && (
          <div className='flex-grow flex items-center space-x-2 px-8'>
            <SlScreenDesktop className='w-6 h-6' />
            <IoIosArrowRoundForward className='w-6 h-6' />
            <span>{currentFolder.name}</span>
          </div>
        )}

        <div className='flex space-x-4'>
          <SlMagnifier className='w-6 h-6 hover:fill-gray-600 transition duration-150' />
          <SlGrid className='w-6 h-6 hover:fill-gray-600 transition duration-150' />
        </div>
      </div>

      <div className='explorer flex h-full bg-gray-900 bg-opacity-0 text-white backdrop-blur-lg'>
        {/* Sidebar for folder navigation */}
        <div className='sidebar bg-transparent text-white w-[200px] p-4 rounded-lg'>
          <ul className='space-y-2'>
            {defaultFolders.map((folder) => {
              const Icon = folderIcons[folder.icon as keyof typeof folderIcons];
              return (
                <li
                  key={folder.name}
                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                    currentFolder?.name === folder.name
                      ? 'bg-gray-600'
                      : 'hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentFolder(folder)}
                >
                  <Icon className='w-6 h-6' />
                  <span>{folder.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Main content area */}
        <div className='content-area flex-1  p-4 bg-transparent rounded-lg'>
          {currentFolder ? (
            <>
              {/* Folder content */}
              <div className='folder-contents'>
                <h3 className='text-2xl font-semibold mb-4'>
                  {currentFolder.name}
                </h3>
                <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4'>
                  {/* Render folder items */}
                  {currentFolder.items.length > 0 ? (
                    currentFolder.items.map((item, index) => {
                      const linkedFolder = defaultFolders.find(
                        (folder) => folder.name === item
                      );
                      return linkedFolder ? (
                        <div
                          key={index}
                          className='flex flex-col items-center p-4 border border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-300 cursor-pointer'
                          onClick={() => handleItemClick(item)} // Navigate to the clicked folder
                        >
                          {/* Use the linked folder's icon */}
                          {linkedFolder && (
                            <>
                              {React.createElement(
                                folderIcons[
                                  linkedFolder.icon as keyof typeof folderIcons
                                ],
                                {
                                  className: 'w-6 h-6 text-gray-300 mb-1', // Margin-bottom for spacing
                                }
                              )}
                              <span className='text-gray-300 text-sm'>
                                {linkedFolder.name}
                              </span>{' '}
                              {/* Adjust text size */}
                            </>
                          )}
                        </div>
                      ) : (
                        <div
                          key={index}
                          className='flex flex-col items-center p-4 border border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-300 cursor-pointer'
                        >
                          <FaFileAlt className='w-6 h-6 text-gray-300 mb-1' />{' '}
                          {/* Margin-bottom for spacing */}
                          <span className='text-gray-300 text-sm'>
                            {item}
                          </span>{' '}
                          {/* Adjust text size */}
                        </div>
                      );
                    })
                  ) : (
                    <p className='text-gray-400'>No files in this folder.</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className='placeholder text-center text-gray-500'>
              <h2>Select a folder to view its contents</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explorer;
