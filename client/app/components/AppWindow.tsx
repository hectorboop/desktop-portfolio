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
  const [size, setSize] = useState({ width: 600, height: 400 });
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      setSize({ width: 600, height: 400 });
      setPosition({ x: 100, y: 100 });
    } else {
      setIsMaximized(true);
      setSize({ width: window.innerWidth, height: window.innerHeight - 30 });
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    const newSize = { ...size };

    if (direction === 'right') {
      newSize.width = e.clientX - position.x;
    } else if (direction === 'bottom') {
      newSize.height = e.clientY - position.y;
    }

    setSize(newSize);
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
        className='absolute bg-gray-800 bg-opacity-70 shadow-lg border border-gray-300 z-10 rounded-lg'
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: 1000,
          display: isMinimized ? 'none' : 'block',
        }}
      >
        {/* Title Bar */}
        <div className='window-titlebar bg-gray-900 text-white flex justify-between items-center px-2 py-1 rounded-lg'>
          <div className='flex items-center'>
            <span className='font-semibold'>{title}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Gradients />
            <button onClick={handleMinimize} title='Minimize'>
              <PiCaretCircleDownFill
                style={{ stroke: 'gradient-2', width: '20px', height: '20px' }}
              />
            </button>

            <button onClick={handleMaximize} title='Maximize'>
              {isMaximized ? (
                <PiCaretCircleLeftFill
                  style={{
                    stroke: 'gradient-2',
                    width: '20px',
                    height: '20px',
                  }}
                />
              ) : (
                <PiCaretCircleUpFill
                  style={{
                    stroke: 'gradient-2',
                    width: '20px',
                    height: '20px',
                  }}
                />
              )}
            </button>
            <button onClick={onClose} title='Close'>
              <PiXCircleFill
                style={{ stroke: 'gradient-2', width: '20px', height: '20px' }}
              />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div
          className='bg-white bg-opacity-20 p-4 overflow-auto'
          style={{ height: size.height - 30 }}
        >
          {content}
        </div>
      </div>
    </Draggable>
  );
};

export default AppWindow;
