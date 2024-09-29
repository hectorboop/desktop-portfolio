import React, { useState } from 'react';
import { FaWindowMinimize, FaWindowMaximize, FaTimes } from 'react-icons/fa';

interface ExplorerWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

const ExplorerWindow: React.FC<ExplorerWindowProps> = ({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ top: 100, left: 100 });

  // Handle drag events
  const handleDrag = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        top: e.clientY - 20, // Adjust based on the window header height
        left: e.clientX - 100, // Adjust based on width
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onMouseMove={handleDrag}
          className={`absolute bg-gray-800 shadow-lg border border-gray-600 ${
            isMaximized ? 'inset-0' : ''
          }`}
          style={{
            top: !isMaximized ? position.top : 'unset',
            left: !isMaximized ? position.left : 'unset',
            width: isMaximized ? '100%' : '500px',
            height: isMaximized ? '100%' : '400px',
          }}
        >
          {/* Window Header */}
          <div
            className='bg-gray-900 p-2 flex justify-between items-center cursor-move'
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <span className='text-white'>Explorer</span>
            {/* Window Controls */}
            <div className='flex space-x-2'>
              <button className='text-white' onClick={onMinimize}>
                <FaWindowMinimize />
              </button>
              <button className='text-white' onClick={onMaximize}>
                <FaWindowMaximize />
              </button>
              <button className='text-white' onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className='bg-white h-full p-4 overflow-auto'>
            <p>This is the Explorer window content.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ExplorerWindow;
