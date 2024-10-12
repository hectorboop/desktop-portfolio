import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { HiUserGroup } from 'react-icons/hi';
import {
  PiCalculator,
  PiDesktop,
  PiLockKey,
  PiNotepad,
  PiPaintBrushHousehold,
  PiPower,
} from 'react-icons/pi';
import {
  RiFolderCloudLine,
  RiFolderDownloadLine,
  RiFolderImageLine,
  RiFolderMusicLine,
  RiFolderVideoLine,
  RiSidebarUnfoldLine,
} from 'react-icons/ri';
import { SlSupport } from 'react-icons/sl';
import { VscAccount, VscRefresh, VscSettingsGear } from 'react-icons/vsc';
import Gradients from './Gradients';
import { GiSuits } from 'react-icons/gi';
import { MdOutlineEmail } from 'react-icons/md';

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
  backgrounds,
  changeBackground,
  isOpen,
  isVisible,
  onClose,
}: Props) {
  const [currentBackground, setCurrentBackground] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null); // Ref to track the StartMenu element

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

  // Effect to close StartMenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose(); // Close the StartMenu
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-14 left-2 h-[650px] w-[300] rounded-lg overflow-hidden bg-gray-900 bg-opacity-60 backdrop-blur-lg shadow-lg border border-solid border-black text-white p-6 flex flex-col z-20
          ${isOpen ? 'open-start-menu' : 'close-start-menu'}
          ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Gradients />
          <div className='flex flex-row w-full h-14 items-center justify-between space-x-4'>
            <div className='flex flex-row items-center space-x-2 px-2'>
              <VscAccount className='w-8 h-8 ' />
              <h2 className='text-xl font-bold px-4'>My Portfolio</h2>
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

          <div className='flex flex-row space-x-8 border border-transparent rounded-lg mb-2'>
            {/* Applications List */}
            <div className='flex flex-col items-start rounded-lg min-w-56'>
              <div className='flex flex-col space-y-1'>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <MdOutlineEmail
                    className='w-8 h-8'
                    style={{ fill: 'url(#gradient-11)' }}
                  />
                  <span>Email</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <PiNotepad
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-11)' }}
                  />
                  <span>Notepad</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <PiPaintBrushHousehold
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-11)' }}
                  />
                  <span>Paint</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <PiCalculator
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-11)' }}
                  />
                  <span>Calculator</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <GiSuits
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-11)' }}
                  />
                  <span>Solitaire</span>
                </button>
              </div>
            </div>

            {/* Folders List */}
            <div className='flex flex-col items-start rounded-lg min-w-56 min-h-72'>
              <div className='flex flex-col space-y-1  '>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <PiDesktop
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-12)' }}
                  />
                  <span>This PC</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <RiFolderCloudLine
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-12)' }}
                  />
                  <span>Documents</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <RiFolderDownloadLine
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-12)' }}
                  />
                  <span>Downloads</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <RiFolderMusicLine
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-12)' }}
                  />
                  <span>Music</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <RiFolderImageLine
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-12)' }}
                  />
                  <span>Pictures</span>
                </button>

                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <RiFolderVideoLine
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-12)' }}
                  />
                  <span>Videos</span>
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-row space-x-8  rounded-lg h-full pt-6'>
            <div className='flex flex-col items-start rounded-lg min-w-56'>
              <div className='flex flex-col space-y-1 '>
                <div className='flex flex-row space-x-8 items-center justify-start'>
                  <div className='flex flex-col md:flex border border-solid border-neutral-600 rounded-lg'>
                    <div className='relative w-[280px] flex items-center justify-center py-4 '>
                      <button
                        className='flex p-1'
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent StartMenu from closing on click
                          prevBackground();
                        }}
                      >
                        ◀
                      </button>

                      <div className='overflow-hidden w-52 h-32 rounded-lg relative'>
                        <Image
                          src={backgrounds[currentBackground].preview}
                          alt={backgrounds[currentBackground].name}
                          layout='fill' // This makes the image take the full width and height of its container
                          objectFit='cover' // This preserves the aspect ratio while covering the entire area
                          className='w-full h-full'
                        />
                        <button
                          className='absolute inset-0 bg-transparent'
                          onClick={(e) => {
                            e.stopPropagation();
                            changeBackground(
                              backgrounds[currentBackground].url
                            );
                          }}
                        />
                      </div>

                      <button
                        className='flex p-1'
                        onClick={(e) => {
                          e.stopPropagation();
                          nextBackground();
                        }}
                      >
                        ▶
                      </button>
                    </div>
                    <h1 className='text-base font-extralight self-center py-1'>
                      Desktop Wallpaper
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-start rounded-lg min-w-56'>
              <div className='flex flex-col space-y-1 '>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <HiUserGroup
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-10)' }}
                  />
                  <span>Account</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <VscSettingsGear
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-10)' }}
                  />
                  <span>Settings...</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <SlSupport
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-10)' }}
                  />
                  <span>Support</span>
                </button>
                <button className='flex items-center space-x-2 rounded-lg py-2 pl-2 pr-40 hover:bg-gray-600 hover:bg-opacity-50'>
                  <RiSidebarUnfoldLine
                    className='w-8 h-8 '
                    style={{ fill: 'url(#gradient-10)' }}
                  />
                  <span>Run</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StartMenu;
