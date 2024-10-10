import React from 'react';

type Props = {};

function Postman({}: Props) {
  return (
    <div className='flex w-full h-full'>
      <iframe
        src='https://www.postman.com/'
        title='Posatman'
        className='h-full w-full bg-ub-cool-grey'
      ></iframe>
    </div>
  );
}

export default Postman;
