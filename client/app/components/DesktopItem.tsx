import React from 'react';

import Gradients from './Gradients';

type Props = {
  icon: React.ReactElement;
  name: string;
  gradientId: string; // ID of the gradient to use
};

function DesktopItem({ icon, name, gradientId }: Props) {
  // How can I open the window onDOubleclick?

  return (
    <>
      <Gradients />

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
    </>
  );
}

export default DesktopItem;
