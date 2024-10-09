import React from 'react';

type Props = { onclose: () => void };

function MongoDB({ onclose }: Props) {
  return (
    <div className='flex w-full h-full'>
      <iframe
        src='https://www.mongodb.com/'
        title='MongoDB'
        className='h-full w-full bg-ub-cool-grey'
      ></iframe>
    </div>
  );
}

export default MongoDB;
