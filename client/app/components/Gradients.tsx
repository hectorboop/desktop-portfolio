// svgGradients.tsx
import React from 'react';

const Gradients = () => {
  return (
    <svg width='0' height='0'>
      {/* Gradient 1 */}
      <linearGradient id='gradient-1' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop stopColor='#f7ff0a' offset='0%' />
        <stop stopColor='#0a607b' offset='100%' />
      </linearGradient>

      {/* Gradient 2 */}
      <linearGradient id='gradient-2' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop stopColor='#ff0080' offset='0%' />
        <stop stopColor='#7928ca' offset='100%' />
      </linearGradient>

      {/* Gradient 3 */}
      <linearGradient id='gradient-3' x1='100%' y1='100%' x2='0%' y2='0%'>
        <stop stopColor='#007cf0' offset='0%' />
        <stop stopColor='#00dfd8' offset='100%' />
      </linearGradient>
      {/* Gradient 4 */}
      <linearGradient id='gradient-4' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop stopColor='#ff7e5f' offset='0%' />
        <stop stopColor='#feb47b' offset='100%' />
      </linearGradient>

      {/* Gradient 5 */}
      <linearGradient id='gradient-5' x1='100%' y1='0%' x2='0%' y2='100%'>
        <stop stopColor='#34e89e' offset='0%' />
        <stop stopColor='#0f3443' offset='100%' />
      </linearGradient>

      {/* Gradient 6 */}
      <linearGradient id='gradient-6' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop stopColor='#d53369' offset='0%' />
        <stop stopColor='#daae51' offset='100%' />
      </linearGradient>

      {/* Gradient 7 */}
      <linearGradient id='gradient-7' x1='0%' y1='100%' x2='100%' y2='0%'>
        <stop stopColor='#30cfd0' offset='0%' />
        <stop stopColor='#330867' offset='100%' />
      </linearGradient>

      {/* Gradient 8 */}
      <linearGradient id='gradient-8' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop stopColor='#f12711' offset='0%' />
        <stop stopColor='#f5af19' offset='100%' />
      </linearGradient>

      {/* Gradient 9 */}
      <linearGradient id='gradient-9' x1='0%' y1='100%' x2='100%' y2='0%'>
        <stop stopColor='#8e2de2' offset='0%' />
        <stop stopColor='#4a00e0' offset='100%' />
      </linearGradient>

      {/* Add more gradients as needed */}
      <linearGradient
        id='start-menu-icon-gradient'
        x1='100%'
        y1='100%'
        x2='0%'
        y2='0%'
      >
        <stop stopColor='#f7ff0a' offset='0%' />
        <stop stopColor='#0a607b' offset='100%' />
      </linearGradient>
      {/* Shadow filter */}
      <filter
        id='desktop-icon-shadow'
        x='-50%'
        y='-50%'
        width='200%'
        height='200%'
      >
        <feGaussianBlur in='SourceAlpha' stdDeviation='2' />{' '}
        {/* Adjust the stdDeviation for shadow softness */}
        <feOffset dx='2' dy='2' result='offsetblur' />
        <feFlood floodColor='rgba(0, 0, 0, 0.5)' /> {/* Shadow color */}
        <feComposite in2='offsetblur' operator='in' />
        <feMerge>
          <feMergeNode />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>
    </svg>
  );
};

export default Gradients;
