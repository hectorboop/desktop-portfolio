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
      className={`flex flex-col items-center justify-center h-screen bg-gray-900 text-white transition-all duration-1000 ease-in-out ${
        isFadingOut ? 'opacity-0 -translate-y-12' : 'opacity-100 translate-y-0'
      }`}
    >
      <h1 className='text-4xl mb-4'>Portfolio App by Rushane Wilson</h1>
      <div className='w-64 h-4 bg-gray-800 rounded-full overflow-hidden'>
        <div
          className='bg-blue-500 h-full transition-all duration-100 ease-linear'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className='mt-2'>{progress}%</p>
    </div>
  );
}

export default SplashScreen;
