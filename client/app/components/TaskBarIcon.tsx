import React from 'react';

type Props = {
  IconComponent: React.ElementType;
  IconName: string;
};

function TaskBarIcon({ IconComponent, IconName }: Props) {
  return (
    <div className='flex items-center space-x-2 border-r border-gray-600 pr-4'>
      <IconComponent className='w-5 h-5' aria-label={IconName} />
    </div>
  );
}

export default TaskBarIcon;
