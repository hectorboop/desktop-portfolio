import React, { useEffect, useState } from 'react';
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import DesktopItem from './DesktopItem';
import AppWindow from './AppWindow';
import { PiFileCloudBold, PiFolderBold, PiTrashBold } from 'react-icons/pi';
import { VscGithub } from 'react-icons/vsc';

import { taskbarApps } from '../utilities/appData';

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

type OpenWindow = {
  id: number;
  title: string;
  content: React.ReactNode;
  zIndex: number;
};

const gridSize = 100; // Size of each grid cell

type Props = {
  toggleAppWindow: (id: number) => void;
  currentAppWindow: number;
};

function DesktopArea({ toggleAppWindow, currentAppWindow }: Props) {
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

  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);

  const openAppWindow = (id: number) => {
    const app = taskbarApps.find((app) => app.id === id);
    if (!app) return;

    const existingWindow = openWindows.find((window) => window.id === id);

    if (existingWindow) {
      // If window is already open, bring it to the front by updating its zIndex
      setOpenWindows((prevWindows) =>
        prevWindows.map((win) =>
          win.id === id ? { ...win, zIndex: highestZIndex } : win
        )
      );
    } else {
      // Create a new window if not already open
      setOpenWindows((prevWindows) => [
        ...prevWindows,
        {
          id: app.id,
          title: app.name,
          content: React.createElement(app.component, {
            onclose: () => closeWindow(app.id),
          }),
          zIndex: highestZIndex,
        },
      ]);
    }

    // Increase zIndex for the next window
    setHighestZIndex((prevZIndex) => prevZIndex + 1);
  };

  const closeWindow = (id: number) => {
    setOpenWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
  };

  // This useEffect will open or bring the window to front when currentAppWindow changes
  useEffect(() => {
    if (currentAppWindow) {
      openAppWindow(currentAppWindow);
    }
  }, [currentAppWindow]);

  const isOccupied = (x: number, y: number, currentId: number) => {
    return icons.some(
      (icon) =>
        icon.position.x === x && icon.position.y === y && icon.id !== currentId
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const idMatch =
      typeof active.id === 'string' ? active.id.match(/icon-(\d+)/) : null;
    const id = idMatch ? Number(idMatch[1]) : null;
    if (id === null) return;

    const draggedIcon = icons.find((icon) => icon.id === id);
    if (!draggedIcon) return;

    // Calculate the new position
    const newX =
      Math.round((draggedIcon.position.x + delta.x) / gridSize) * gridSize;
    const newY =
      Math.round((draggedIcon.position.y + delta.y) / gridSize) * gridSize;

    // Check if the new position is occupied
    if (isOccupied(newX, newY, id)) return;

    // Update the icon's position and save it
    setIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.id === id ? { ...icon, position: { x: newX, y: newY } } : icon
      )
    );
  };

  const DraggableIcon = ({ icon }: { icon: DesktopIcon }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: `icon-${icon.id}`,
    });

    const style = {
      position: 'absolute',
      left: `${icon.position.x}px`,
      top: `${icon.position.y}px`,
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      width: `${gridSize}px`,
      height: `${gridSize}px`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      flexDirection: 'column' as 'column',
    } as React.CSSProperties;

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <DesktopItem
          icon={icon.icon}
          name={icon.name}
          gradientId={icon.gradientId}
        />
      </div>
    );
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className='relative w-full h-full bg-transparent'>
        {/* Desktop Icons Grid */}
        <div
          className='grid grid-cols-10 gap-2 w-full h-full'
          style={{
            gridTemplateRows: `repeat(10, ${gridSize}px)`,
            gridTemplateColumns: `repeat(20, ${gridSize}px)`,
          }}
        >
          {icons.map((icon) => (
            <DraggableIcon key={icon.id} icon={icon} />
          ))}

          {/* Render open app windows */}
          {openWindows.map((window) => (
            <div
              key={window.id}
              className='absolute'
              style={{
                top: '50px', // Customize positioning here
                left: '200px', // Customize positioning here
                width: '500px', // Customize dimensions here
                height: '300px',
                zIndex: window.zIndex,
                pointerEvents: 'auto',
              }}
            >
              <AppWindow
                title={window.title}
                content={window.content}
                onClose={() => closeWindow(window.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default DesktopArea;
