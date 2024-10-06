import React, { useState } from 'react';
import Draggable from 'react-draggable';

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
        className='absolute bg-gray-800 shadow-lg border border-gray-300 z-10'
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex: 1000,
          display: isMinimized ? 'none' : 'block',
        }}
      >
        {/* Title Bar */}
        <div className='window-titlebar bg-gray-900 text-white flex justify-between items-center px-2 py-1'>
          <div className='flex items-center'>
            <span className='font-semibold'>{title}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <button onClick={handleMinimize} className='hover:bg-gray-700 px-2'>
              _
            </button>
            <button onClick={handleMaximize} className='hover:bg-gray-700 px-2'>
              □
            </button>
            <button onClick={onClose} className='hover:bg-red-600 px-2'>
              X
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div
          className='bg-white p-4 overflow-auto'
          style={{ height: size.height - 30 }}
        >
          {content}
        </div>

        {/* Resizable Border */}
        <div
          className='absolute right-0 bottom-0 w-4 h-4 bg-transparent cursor-se-resize'
          onMouseDown={(e) => {
            e.preventDefault();
            const move = (event: MouseEvent) =>
              handleResize(event as any, 'right');
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', () => {
              window.removeEventListener('mousemove', move);
            });
          }}
        ></div>

        <div
          className='absolute bottom-0 w-full h-2 bg-transparent cursor-s-resize'
          onMouseDown={(e) => {
            e.preventDefault();
            const move = (event: MouseEvent) =>
              handleResize(event as any, 'bottom');
            window.addEventListener('mousemove', move);
            window.addEventListener('mouseup', () => {
              window.removeEventListener('mousemove', move);
            });
          }}
        ></div>
      </div>
    </Draggable>
  );
};

export default AppWindow;
