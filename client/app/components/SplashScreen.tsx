import React, { useEffect, useState } from 'react';

type Props = {
  onFinish: () => void; // Callback to notify when the splash screen is done
};

function SplashScreen({ onFinish }: Props) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false); // Track fade-out state

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1; // Increment progress by 1 every 100ms
        } else {
          clearInterval(interval); // Clear the interval when progress reaches 100
          return prevProgress;
        }
      });
    }, 100); // Update progress every 100ms

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    // Trigger the fade-out once the progress reaches 100
    if (progress === 100) {
      setTimeout(() => {
        setIsFadingOut(true); // Start the fade-out animation
        setTimeout(() => onFinish(), 1000); // Notify parent after animation ends
      }, 500); // Small delay before starting fade-out
    }
  }, [progress, onFinish]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 -translate-y-12' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className='flex flex-col items-center justify-center h-[200px] w-[700px]'>
        <h1 className='text-4xl mb-4 mt-8 font-mono'>
          Portfolio App by Rushane Wilson
        </h1>

        <div className='relative flex items-center justify-center py-4 w-full'>
          <div className='w-full h-4 rounded-full overflow-hidden bg-gray-700'>
            <div
              className='h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className='absolute bottom-0 mt-2 font-mono text-blue-400 text-wrap w-96 text-center'>
        Please note that this is a work in progress and may not be fully
        functional. In addition, updates are pushed every week to fix issues and
        add functionality.
      </p>
    </div>
  );
}

export default SplashScreen;
