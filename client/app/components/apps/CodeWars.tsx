import React from 'react';

type Props = { onclose: () => void };

function CodeWars({ onclose }: Props) {
  return (
    <div className='flex w-full h-full'>
      <iframe
        src='https://www.codewars.com'
        title='LeetCode'
        className='h-full w-full bg-ub-cool-grey'
      ></iframe>
    </div>
  );
}

export default CodeWars;
