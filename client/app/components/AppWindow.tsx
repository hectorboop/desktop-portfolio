import React, { useState } from 'react';
import Draggable from 'react-draggable';
import {
  PiCaretCircleDownFill,
  PiCaretCircleLeftFill,
  PiCaretCircleUpFill,
  PiXCircleFill,
} from 'react-icons/pi';
import Gradients from './Gradients';

type Props = {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
};

const AppWindow = ({ title, content, onClose }: Props) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      setSize({ width: 800, height: 600 });
      setPosition({ x: 0, y: 0 });
    } else {
      setIsMaximized(true);
      setSize({ width: window.innerWidth, height: window.innerHeight - 60 });
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Draggable
      handle='.window-titlebar'
      position={position}
      onStop={(e: any, data: { x: any; y: any }) =>
        setPosition({ x: data.x, y: data.y })
      }
    >
      <div
        className='absolute  border-black z-10 rounded-lg bg-gray-900 bg-opacity-60 backdrop-blur-lg shadow-lg border border-solid text-white'
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: 1000,
          display: 'block', // Adjust for minimize logic if needed
        }}
      >
        <Gradients />
        {/* Title Bar */}
        <div className='window-titlebar bg-gray-950 flex flex-row items-center space-x-1 px-2 py-1 rounded-t-lg text-white'>
          <div className='flex items-center space-x-2 '>
            <button onClick={onClose} title='Close'>
              <PiXCircleFill
                style={{
                  fill: 'url(#gradient-13)',
                  width: '20px',
                  height: '20px',
                }}
              />
            </button>

            <button onClick={handleMaximize} title='Maximize'>
              {isMaximized ? (
                <PiCaretCircleLeftFill
                  style={{
                    fill: 'url(#gradient-13)',
                    width: '20px',
                    height: '20px',
                  }}
                />
              ) : (
                <PiCaretCircleUpFill
                  style={{
                    fill: 'url(#gradient-13)',
                    width: '20px',
                    height: '20px',
                  }}
                />
              )}
            </button>
            <button onClick={handleMinimize} title='Minimize'>
              <PiCaretCircleDownFill
                style={{
                  fill: 'url(#gradient-13)',
                  width: '20px',
                  height: '20px',
                }}
              />
            </button>
          </div>
          <div className='flex-grow flex justify-center items-center'>
            <span className='font-semibold text-white'>{title}</span>
          </div>
        </div>

        {/* Window Content with Custom Scrollbar */}
        <div
          className='bg-transparent overflow-auto custom-scrollbar'
          style={{ height: size.height - 30 }}
        >
          {content}
        </div>
      </div>
    </Draggable>
  );
};

export default AppWindow;
