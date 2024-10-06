import React, { useState, useEffect } from 'react';

interface TaskBarItemProps {
  IconComponent: React.ComponentType; // Icon component from react-icons
  appName: string; // Name of the app (for tooltip)
  onClick: () => void; // Function to execute when the app is clicked
}

const TaskBarItem: React.FC<TaskBarItemProps> = ({
  IconComponent,
  appName,
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (hovering) {
      timer = setTimeout(() => setShowTooltip(true), 2000);
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timer);
  }, [hovering]);

  return (
    <div
      className='relative flex flex-col items-center'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* TaskBar App Button */}
      <button
        className='text-white p-2 rounded-lg transition transform hover:scale-105 active:scale-95 duration-150 ease-out'
        onClick={onClick}
      >
        <IconComponent />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className='absolute bottom-full mb-2 px-3 py-1 text-sm text-white bg-gray-700 rounded-md opacity-0 animate-fadeIn'>
          {appName}
        </div>
      )}
    </div>
  );
};

export default TaskBarItem;
