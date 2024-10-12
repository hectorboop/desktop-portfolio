import React from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineReload,
} from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';

type Props = { url: string };

function Browser({ url = 'https://www.google.com/webhp?igu=1' }: Props) {
  const name = 'Rushane Wilson';

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-10'>
        <div className='flex bg-gray-800 w-full h-10 border-b border-gray-700'>
          <div className='flex p-2 w-28 justify-around'>
            <AiOutlineArrowLeft className='text-xl opacity-45' />
            <AiOutlineArrowRight className='text-xl opacity-45' />
            <AiOutlineReload className='text-xl hover:bg-gray-600 hover:bg-opacity-50 rounded-xl' />
          </div>
          <div className='w-[48vw] my-1.5 rounded-xl bg-gray-700 relative'>
            <div className='opacity-50 text-left pl-3 flex items-center h-full'>
              <BsSearch className='text-[20px] pr-3' />
              {url}
            </div>
            <FaRegStar className='absolute right-2 top-1 text-lg opacity-80' />
          </div>
          <div className='flex justify-center items-center ml-6'>
            <div className='bg-blue-500 text-white rounded-full w-6 h-6 flex justify-center items-center'>
              {name && (
                <div className='text-white text-md font-normal'>
                  {generateInitials(name)}
                </div>
              )}
            </div>
          </div>
          <img
            src='/images/options/dots.png'
            alt='options'
            className='h-4 w-4 rotate-90 m-2.5 opacity-60'
          />
        </div>
      </div>
      <div className='w-full h-full'>
        <iframe
          src={url}
          title='Chrome'
          width='100%'
          height='100%'
          frameBorder='0'
        />
      </div>
    </div>
  );
}

function generateInitials(name: string | undefined): string {
  if (!name) return '';
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  return initials;
}

export default Browser;
