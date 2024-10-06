import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

type Props = {
  onClose: () => void;
};

// Simulated folder and file structure
const folderStructure = {
  Home: {
    Documents: ['File1.txt', 'File2.docx'],
    Pictures: ['Image1.png', 'Image2.jpg'],
    Videos: ['Video1.mp4', 'Video2.mov'],
  },
};

function FileExplorer({ onClose }: Props) {
  const [currentDirectory, setCurrentDirectory] = useState('Home'); // Track current directory
  const [folders, setFolders] = useState(Object.keys(folderStructure['Home'])); // List of folders
  const [files, setFiles] = useState<string[]>([]); // List of files
  const [isMaximized, setIsMaximized] = useState(false); // Track if window is maximized
  const [isMinimized, setIsMinimized] = useState(false); // Track if window is minimized
  const [isResizing, setIsResizing] = useState(false); // Resizing flag

  const [size, setSize] = useState({ width: 400, height: 300 }); // Window size
  const [position, setPosition] = useState({ x: 100, y: 100 }); // Window position
  const [originalSize, setOriginalSize] = useState(size); // Store original size before maximize

  // Handle folder navigation
  const openFolder = (folder: string) => {
    const newFiles = folderStructure[currentDirectory][folder];
    setCurrentDirectory(folder);
    setFolders([]); // No subfolders in this example
    setFiles(newFiles);
  };

  // Handle back button (go up to Home directory)
  const handleBackClick = () => {
    setCurrentDirectory('Home');
    setFolders(Object.keys(folderStructure['Home']));
    setFiles([]);
  };

  // Minimize window
  const minimizeWindow = () => {
    setIsMinimized(true);
  };

  // Maximize/Restore window
  const maximizeRestoreWindow = () => {
    if (isMaximized) {
      // Restore to original size and position
      setIsMaximized(false);
      setSize(originalSize);
      setPosition({ x: 100, y: 100 });
    } else {
      setOriginalSize(size); // Save current size

      // Maximize within the viewport (consider viewport height and taskbar if needed)
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Maximize window to fit the viewport and constrain it within visible screen area
      setSize({
        width: viewportWidth - 10, // 10px padding for borders
        height: viewportHeight - 10, // 10px padding for borders
      });

      // Reposition to (0,0) or add some padding if necessary
      setPosition({ x: 5, y: 5 });

      setIsMaximized(true);
    }
  };

  // Handle resizing
  const handleMouseDownResize = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.stopPropagation();
  };

  const handleMouseMoveResize = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX - position.x;
      const newHeight = e.clientY - position.y;
      setSize({
        width: Math.max(newWidth, 200), // Set a minimum width
        height: Math.max(newHeight, 200), // Set a minimum height
      });
    }
  };

  const handleMouseUpResize = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMoveResize);
      document.addEventListener('mouseup', handleMouseUpResize);
    } else {
      document.removeEventListener('mousemove', handleMouseMoveResize);
      document.removeEventListener('mouseup', handleMouseUpResize);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveResize);
      document.removeEventListener('mouseup', handleMouseUpResize);
    };
  }, [isResizing]);

  // Restore window if minimized
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className='bg-blue-700 text-white p-2 rounded'
      >
        Restore File Explorer
      </button>
    );
  }

  return (
    <Draggable handle='.header' bounds='parent' disabled={isMaximized}>
      <div>
        <div
          className='absolute bg-gray-800 rounded-lg shadow-lg flex flex-col'
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {/* Header */}
          <div className='header bg-gray-700 p-2 flex justify-between items-center rounded-t-lg cursor-grab'>
            <h2 className='text-white'>File Explorer - {currentDirectory}</h2>
            <div className='flex space-x-2'>
              <button
                onClick={minimizeWindow}
                className='text-white bg-yellow-500 px-2 py-1 rounded'
              >
                _
              </button>
              <button
                onClick={maximizeRestoreWindow}
                className='text-white bg-green-500 px-2 py-1 rounded'
              >
                {isMaximized ? '🔳' : '□'}
              </button>
              <button
                onClick={onClose}
                className='text-white bg-red-600 px-2 py-1 rounded'
              >
                X
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='flex-grow p-4 bg-gray-900 overflow-y-auto'>
            {currentDirectory !== 'Home' && (
              <button
                onClick={handleBackClick}
                className='text-white bg-blue-700 px-3 py-1 rounded mb-4'
              >
                Back to Home
              </button>
            )}

            {/* Folders */}
            {folders.length > 0 && (
              <div>
                <h3 className='text-blue-300 mb-2'>Folders</h3>
                <ul>
                  {folders.map((folder) => (
                    <li
                      key={folder}
                      className='text-white p-2 bg-gray-700 mb-2 rounded cursor-pointer hover:bg-gray-600'
                      onClick={() => openFolder(folder)}
                    >
                      {folder}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Files */}
            {files.length > 0 && (
              <div>
                <h3 className='text-green-300 mb-2'>Files</h3>
                <ul>
                  {files.map((file) => (
                    <li
                      key={file}
                      className='text-white p-2 bg-gray-700 mb-2 rounded'
                    >
                      {file}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {folders.length === 0 && files.length === 0 && (
              <p className='text-white'>No files or folders available</p>
            )}
          </div>

          {/* Resizable Handle */}
          <div
            onMouseDown={handleMouseDownResize}
            className='absolute bottom-0 right-0 w-4 h-4 bg-gray-500 cursor-se-resize'
          ></div>
        </div>
      </div>
    </Draggable>
  );
}

export default FileExplorer;
