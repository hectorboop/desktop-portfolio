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
import {
  PiFileCloudBold,
  PiFolderBold,
  PiMapTrifoldBold,
  PiTrashBold,
} from 'react-icons/pi';
import { VscGithub } from 'react-icons/vsc';

import { taskbarApps } from '../utilities/appData';
import About from './apps/About';
import Bin from './apps/Bin';
import Projects from './apps/Projects';
import Repo from './apps/Repo';
import { OpenWindow } from '../utilities/types';

type GridSlot = {
  x: number;
  y: number;
};

type DesktopIcon = {
  id: number;
  name: string;
  position: GridSlot;
  icon: JSX.Element;
  gradient: string;
  component: JSX.Element;
};

const gridSize = 100; // Size of each grid cell

type Props = {
  currentAppWindow: number;
  appWindows: OpenWindow[];
  setAppWindows: React.Dispatch<React.SetStateAction<OpenWindow[]>>;
};

function DesktopArea({ currentAppWindow, appWindows, setAppWindows }: Props) {
  const [icons, setIcons] = useState<DesktopIcon[]>([
    {
      id: 101, // IDs must be unique
      name: 'Bin',
      position: { x: 0, y: 0 },
      icon: <PiTrashBold />,
      gradient: 'gradient-3',
      component: <Bin />,
    },
    {
      id: 102,
      name: 'About.ME',
      position: { x: 0, y: 100 },
      icon: <PiFileCloudBold />,
      gradient: 'gradient-8',
      component: <About />,
    },
    {
      id: 103,
      name: 'Projects',
      position: { x: 0, y: 200 },
      icon: <PiMapTrifoldBold />,
      gradient: 'gradient-1',
      component: <Projects />,
    },
    {
      id: 104,
      name: 'Repo',
      position: { x: 0, y: 300 },
      icon: <VscGithub />,
      gradient: 'gradient-2',
      component: <Repo />,
    },
  ]);

  const [highestZIndex, setHighestZIndex] = useState(1);

  const openAppWindow = (id: number) => {
    const app =
      taskbarApps.find((app) => app.id === id) ||
      icons.find((icon) => icon.id === id);
    if (!app) return;

    setAppWindows((prevWindows) => {
      const existingWindow = prevWindows.find((window) => window.id === id);

      if (existingWindow) {
        // If window is already open, toggle its minimized state
        if (existingWindow.minimized) {
          // Bring it to the front and un-minimize it
          return prevWindows.map((win) =>
            win.id === id
              ? { ...win, minimized: false, zIndex: highestZIndex }
              : win
          );
        } else {
          // If the window is already open and not minimized, minimize it
          return prevWindows.map((win) =>
            win.id === id ? { ...win, minimized: true } : win
          );
        }
      } else {
        // Create a new window if not already open
        const newWindow: OpenWindow = {
          id: app.id,
          title: app.name,
          icon: app.icon as JSX.Element, // Ensure this is of type JSX.Element
          gradient: app.gradient, // Assuming this is a string
          content:
            typeof app.component === 'function'
              ? React.createElement(
                  app.component as React.ComponentType<{ onClose: () => void }>,
                  {
                    onClose: () => closeWindow(app.id),
                  }
                )
              : (app.component as JSX.Element), // Ensure component is a JSX.Element
          zIndex: highestZIndex,
          minimized: false, // New window starts unminimized
        };

        return [...prevWindows, newWindow]; // Return the new array with the new window
      }
    });

    // Increase zIndex for the next window
    setHighestZIndex((prevZIndex) => prevZIndex + 1);
  };

  const closeWindow = (id: number) => {
    setAppWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
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
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
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
      cursor: 'pointer',
    } as React.CSSProperties;

    // Add the onMouseUp to check for actual clicks
    const handleMouseUp = () => {
      if (!isDragging) {
        openAppWindow(icon.id);
      }
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onMouseUp={handleMouseUp} // Handle click here
      >
        <DesktopItem
          icon={icon.icon}
          name={icon.name}
          gradientId={icon.gradient}
        />
      </div>
    );
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

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
          {appWindows.map(
            (window) =>
              !window.minimized && (
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
              )
          )}
        </div>
      </div>
    </DndContext>
  );
}

export default DesktopArea;
