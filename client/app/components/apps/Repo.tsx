import React from 'react';

type Props = {};

function Repo({}: Props) {
  return (
    <div className='app-window w-full h-full p-6 '>
      {/* Window Content */}
      <div className='window-content p-6 rounded-lg bg-transparent border border-white text-gray-300 shadow-inner'>
        <p>
          Explore all my repositories and contributions on GitHub. Feel free to
          contribute or explore my open-source projects.
        </p>

        {/* Actions */}
        <div className='actions mt-4'>
          <a
            href='https://github.com/hectorboop?tab=repositories '
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl'
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default Repo;
