import React, { useState } from 'react';
import {
  FaBold,
  FaItalic,
  FaRedo,
  FaSave,
  FaUnderline,
  FaUndo,
} from 'react-icons/fa';

type Props = {};

function About({}: Props) {
  const [text, setText] = useState(`Rushane Wilson - Developer Profile
    
    About Me:
    ------------
    Hello! I'm Rushane Wilson, a highly versatile software developer with a focus on web development, backend services, and SQL database management. My primary goal is to build scalable, user-friendly applications that streamline business operations and improve efficiency.
    
    Experience:
    ------------
    I have worked as an SQL Developer at Sequium Asset Management, optimizing stored procedures, automating file processing tasks, and improving daily business workflows. I also served as a Data Integrity Analyst at AvantStay, where I prototyped solutions for housekeeping management and supported the operations team with data migration.
    
    Key Skills:
    ------------
    - React, TypeScript, JavaScript
    - SQL, C#, .NET, ASP.NET, SSRS
    - Node.js, Next.js, TailwindCSS
    - Backend API Development
    - Windows Application Development (WPF)
    
    Work Experience:
    ------------
    - **Sequium Asset Management (Marietta, GA, Remote)** — SQL Developer (Feb 2023 - Present)
      - Optimized and maintained stored procedures for daily processes.
      - Automated file processing tasks for data import, export, and report generation.
      - Developed in-house apps to load client data and safeguard sensitive information.
      - Generated automated financial reports for actionable insights.
    
    - **AvantStay (West Hollywood, CA, Remote)** — Data Integrity Analyst (Nov 2021 - Oct 2022)
      - Prototyped housekeeping management solutions.
      - Supported the team in migrating data from Breezeway to Salesforce.
      - Audited housekeeping performance through custom applications.
    
    Education:
    ------------
    - **University of Technology, Jamaica** — BS in Computing (Computer Science), Aug 2023
    
    Projects:
    ------------
    - **Real Estate Sales/Rentals Listings** — ReactJS, NodeJS, RapidAPI, Typescript
      - Built a front-end app with connectivity to real estate APIs.
      - Other projects available at [Portfolio](https://hectorboop.github.io/)
    
    Achievements:
    ------------
    - Automated file processing tasks for downloading, processing, uploading, and reporting.
    - Optimized SQL procedures, improving data retrieval times by 40%.
    - Developed PortfolioOS, a React-based custom desktop-like project.
    
    Certifications:
    ------------
    - Career Essentials in Software Development by Microsoft & LinkedIn
    
    Interests:
    ------------
    In my free time, I enjoy learning new frameworks and exploring AI and machine learning.
    `);

  return (
    <div className='flex flex-col bg-transparent w-full h-full'>
      {/* Header Bar */}
      <div className='flex justify-between items-center bg-transparent '>
        <div className='flex space-x-2 justify-between items-center'>
          <div className='flex items-center space-x-0'>
            <div className='flex self-center p-2 hover:bg-gray-600'>File</div>
            <div className='flex self-center p-2 hover:bg-gray-600'>Edit</div>
            <div className='flex self-center p-2 hover:bg-gray-600'>View</div>
          </div>
          <div className='flex items-center space-x-0'>
            <button className='flex items-center p-2 hover:bg-gray-600 transition duration-300'>
              <FaSave className='mr-1' />
            </button>
            <button className='flex items-center p-2 hover:bg-gray-600 transition duration-300'>
              <FaUndo className='mr-1' />
            </button>
            <button className='flex items-center p-2 hover:bg-gray-600 transition duration-300'>
              <FaRedo className='mr-1' />
            </button>
            <button className='flex items-center p-2 hover:bg-gray-600 transition duration-300'>
              <FaBold className='mr-1' />
            </button>
            <button className='flex items-center p-2 hover:bg-gray-600 transition duration-300'>
              <FaItalic className='mr-1' />
            </button>
            <button className='flex items-center p-2 hover:bg-gray-600 transition duration-300'>
              <FaUnderline className='mr-1' />
            </button>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='flex flex-grow w-full h-full p-4 text-white text-wrap border-gray-300 bg-transparent resize-none outline-none'
        placeholder='Start typing your notes here...'
      />

      {/* Footer */}
      <div className='flex justify-between items-center p-2 bg-transparent border-gray-300'>
        <span className='text-sm text-white'>
          Character Count: {text.length}
        </span>
      </div>
    </div>
  );
}

export default About;
