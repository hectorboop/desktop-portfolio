import React, { useState } from 'react';
import DesktopItem from './DesktopItem';
import AppWindow from './AppWindow';
import { PiFileCloudBold, PiFolderBold, PiTrashBold } from 'react-icons/pi';
import { VscGithub } from 'react-icons/vsc';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

type GridSlot = {
  x: number;
  y: number;
};

type DesktopIcon = {
  id: number;
  name: string;
  position: GridSlot;
  icon: JSX.Element;
  gradientId: string;
  windowContent: React.ReactNode;
};

const gridSize = 100; // Size of each grid cell

function DesktopArea() {
  const [icons, setIcons] = useState<DesktopIcon[]>([
    {
      id: 1,
      name: 'Bin',
      position: { x: 0, y: 0 },
      icon: <PiTrashBold />,
      gradientId: 'gradient-3',
      windowContent: (
        <AppWindow
          title='Bin'
          content={<div>Bin Content</div>}
          onClose={() => {}}
        />
      ),
    },
    {
      id: 2,
      name: 'About.ME',
      position: { x: 0, y: 100 },
      icon: <PiFileCloudBold />,
      gradientId: 'gradient-8',
      windowContent: (
        <AppWindow
          title='About.ME'
          content={<div>About Content</div>}
          onClose={() => {}}
        />
      ),
    },
    {
      id: 3,
      name: 'Projects',
      position: { x: 0, y: 200 },
      icon: <PiFolderBold />,
      gradientId: 'gradient-1',
      windowContent: (
        <AppWindow
          title='Projects'
          content={<div>Projects Content</div>}
          onClose={() => {}}
        />
      ),
    },
    {
      id: 4,
      name: 'Repo',
      position: { x: 0, y: 300 },
      icon: <VscGithub />,
      gradientId: 'gradient-2',
      windowContent: (
        <AppWindow
          title='Repo'
          content={<div>Repo Content</div>}
          onClose={() => {}}
        />
      ),
    },
  ]);

  const [openWindows, setOpenWindows] = useState<
    { id: number; title: string; content: React.ReactNode }[]
  >([]);

  // Function to open a window on double-clicking an icon
  const openWindow = (icon: DesktopIcon) => {
    if (!openWindows.some((win) => win.id === icon.id)) {
      setOpenWindows((prevWindows) => [
        ...prevWindows,
        { id: icon.id, title: icon.name, content: icon.windowContent },
      ]);
    }
  };

  // Function to close a window
  const closeWindow = (id: number) => {
    setOpenWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
  };

  // Helper function to check if a position is occupied by any icon
  const isOccupied = (x: number, y: number, currentId: number) => {
    return icons.some(
      (icon) =>
        icon.position.x === x && icon.position.y === y && icon.id !== currentId
    );
  };

  // Function to handle the stop event when an icon is dragged
  const handleDragStop = (
    e: DraggableEvent,
    data: DraggableData,
    id: number
  ) => {
    // Calculate the new grid-aligned position
    const newX = Math.round(data.x / gridSize) * gridSize;
    const newY = Math.round(data.y / gridSize) * gridSize;

    // Check if the new position is already occupied
    if (isOccupied(newX, newY, id)) {
      // If occupied, do not update the position (icon snaps back)
      return;
    }

    // Update the icon's position and save it
    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === id ? { ...icon, position: { x: newX, y: newY } } : icon
      )
    );
  };

  return (
    <div className='relative w-full h-full bg-transparent'>
      <div
        className='grid grid-cols-10 gap-2 w-full h-full'
        style={{
          gridTemplateRows: `repeat(10, ${gridSize}px)`,
          gridTemplateColumns: `repeat(20, ${gridSize}px)`,
        }}
      >
        {/* Render desktop icons */}
        {icons.map((icon) => (
          <Draggable
            key={icon.id}
            grid={[gridSize, gridSize]}
            bounds='parent'
            position={{ x: icon.position.x, y: icon.position.y }}
            onStop={(e, data) => handleDragStop(e, data, icon.id)}
          >
            <div
              style={{
                position: 'absolute',
                width: `${gridSize}px`,
                height: `${gridSize}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                flexDirection: 'column',
              }}
              onDoubleClick={() => openWindow(icon)}
            >
              <DesktopItem
                icon={icon.icon}
                name={icon.name}
                gradientId={icon.gradientId}
                windowContent={icon.windowContent}
              />
            </div>
          </Draggable>
        ))}
      </div>

      {/* Render open windows */}
      {openWindows.map((win) => (
        <AppWindow
          key={win.id}
          title={win.title}
          content={win.content}
          onClose={() => closeWindow(win.id)}
        />
      ))}
    </div>
  );
}

export default DesktopArea;
