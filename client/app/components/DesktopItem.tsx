import React, { useState } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';

import Gradients from './Gradients';

type Props = {
  icon: React.ReactElement;
  name: string;
  initialPosition: { x: number; y: number };
  gridSize: number; // Size of the grid slot (both width and height)
  gradientId: string; // ID of the gradient to use
  windowContent: React.ReactNode;
};

function DesktopItem({
  icon,
  name,
  initialPosition,
  gridSize,
  gradientId,
  windowContent,
}: Props) {
  const [position, setPosition] = useState(initialPosition);

  // Helper function to calculate nearest grid position
  const snapToGrid = (x: number, y: number) => {
    const snappedX = Math.round(x / gridSize) * gridSize;
    const snappedY = Math.round(y / gridSize) * gridSize;
    return { x: snappedX, y: snappedY };
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    const newPosition = snapToGrid(data.x, data.y);
    setPosition(newPosition);
  };

  return (
    <>
      <Gradients />
      <Draggable
        position={position}
        onStop={handleStop}
        grid={[gridSize, gridSize]} // Force drag to grid increments
      >
        <div className='flex flex-col items-center p-2 cursor-pointer hover:bg-gray-100 hover:bg-opacity-60 transition duration-200 rounded-lg shadow-none'>
          <div className='p-2' style={{ filter: 'url(#desktop-icon-shadow)' }}>
            {/* Render the icon and apply the gradient */}
            {React.cloneElement(icon, {
              style: {
                fill: `url(#${gradientId})`,
                width: '42px',
                height: '42px',
              },
            })}
          </div>
          <div className='text-white text-sm mt-1 text-nowrap overflow-hidden text-ellipsis w-20 text-center bg-gradient-to-tr from-gray-600 to-stone-900 rounded-lg shadow-xl'>
            {name}
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default DesktopItem;
