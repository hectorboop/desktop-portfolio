import React from 'react';

type Props = {};

function Docker({}: Props) {
  return (
    <div className='flex w-full h-full'>
      <iframe
        src='https://www.docker.com/'
        title='Docker'
        className='h-full w-full bg-ub-cool-grey'
      ></iframe>
    </div>
  );
}

export default Docker;
