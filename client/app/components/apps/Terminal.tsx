import React, { useEffect, useRef, useState } from 'react';

type Props = {};

function Terminal({}: Props) {
  const [commands, setCommands] = useState<string[]>([
    'OS Portfolio Project - v.1.0.7a',
  ]); // Add startup message as initial command
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Trim whitespace and prevent adding empty commands
      if (currentCommand.trim() !== '') {
        setCommands((prevCommands) => [...prevCommands, currentCommand.trim()]);
        setCurrentCommand(''); // Clear input after command is entered
      }
    }
  };

  // Scroll to the bottom of the terminal when a new command is entered
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  return (
    <div className='terminal flex flex-col h-full w-full bg-black text-white p-4 font-mono'>
      {/* Terminal Output Section */}
      <div className='flex-1 overflow-auto'>
        {commands.map((cmd, index) => (
          <div key={index}>
            <span className='text-teal-400'>$ {cmd}</span>
            <br />
            <span>./</span>
          </div>
        ))}
        {/* Dummy div to ensure scrolling works */}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Section (Stays at the bottom) */}
      <div className='flex-none'>
        <span className='text-teal-400'>$</span>
        <input
          type='text'
          className='input bg-black text-white border-none outline-none ml-2 w-full'
          value={currentCommand}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='Type your command...'
        />
      </div>
    </div>
  );
}

export default Terminal;
