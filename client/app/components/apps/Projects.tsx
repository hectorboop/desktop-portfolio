import Image from 'next/image';
import React from 'react';

type Project = {
  name: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'To Do';
  frameworks: string[];
  imageUrl: string;
  projectUrl: string;
};

const projects: Project[] = [
  {
    name: 'PortfolioOS',
    description: 'A React desktop application.',
    status: 'In Progress',
    frameworks: ['React', 'TypeScript', 'TailwindCSS'],
    imageUrl: '/images/dune.jpg',
    projectUrl: 'https://desktop-portfolio-mu.vercel.app/',
  },
  {
    name: 'Realtor',
    description: 'A React rental service application.',
    status: 'Completed',
    frameworks: ['Next.js', 'OpenApi'],
    imageUrl: '/images/dune.jpg',
    projectUrl: 'https://real-estate-two-sepia.vercel.app/',
  },
];

const Projects: React.FC = () => {
  return (
    <div className='p-6 h-full text-white'>
      {/* Top Bar */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-bold'>Projects Timeline</h2>
      </div>

      {/* Timeline */}
      <div className='relative'>
        {/* Timeline Line on the Left (thin and from the edges) */}
        <div className='absolute left-0 top-0 bottom-0 w-0.5 bg-white'></div>

        {projects.map((project, index) => (
          <div key={index} className='mb-12 flex items-center relative'>
            {/* Timeline Dot (smaller) */}
            <div className='absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-white'></div>

            {/* Project Card on the Right with rounded border */}
            <div className='flex flex-row justify-between ml-12 w-[70%] p-4 border border-white rounded-lg'>
              <div className='flex flex-col items-start justify-between'>
                {/* Project Name with Gradient */}
                <h3 className='text-xl font-semibold mb-1'>
                  <a
                    href={project.projectUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'
                  >
                    {project.name}
                  </a>
                </h3>

                {/* Description */}
                <p className='text-gray-300 mb-2'>{project.description}</p>

                {/* Frameworks */}
                <div className='text-sm text-gray-300'>
                  <span className='font-semibold'>Frameworks:</span>{' '}
                  {project.frameworks.join(', ')}
                </div>
              </div>

              <div className='w-[200px] h-[120px] e rounded-lg'>
                {/* Picture using Next.js Image component */}
                <Image
                  src={project.imageUrl}
                  alt={project.name}
                  width={200} // Adjust as needed for optimization
                  height={100} // Adjust as needed for optimization
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
