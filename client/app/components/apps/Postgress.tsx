import React from 'react';

type Props = {};

function Postgress({}: Props) {
  return (
    <div className='flex w-full h-full'>
      <iframe
        src='https://www.postgresql.org/'
        title='Postgre'
        className='h-full w-full bg-ub-cool-grey'
      ></iframe>
    </div>
  );
}

export default Postgress;
