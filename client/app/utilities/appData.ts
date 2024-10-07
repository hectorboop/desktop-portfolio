import { SiPostman } from 'react-icons/si';
import Explorer from '../components/apps/Explorer';
import {
  BiFolder,
  BiLogoChrome,
  BiLogoDocker,
  BiLogoMongodb,
  BiLogoPostgresql,
  BiLogoVisualStudio,
} from 'react-icons/bi';
import Browser from '../components/apps/Browser';
import VSCode from '../components/apps/VSCode';
import Docker from '../components/apps/Docker';
import Postgress from '../components/apps/Postgress';
import MongoDB from '../components/apps/MongoDB';
import Postman from '../components/apps/Postman';

export const taskbarApps = [
  {
    id: 1,
    name: 'File Explorer',
    icon: BiFolder,
    gradient: 'gradient-2',
    component: Explorer,
  },
  {
    id: 2,
    name: 'Chrome',
    icon: BiLogoChrome,
    gradient: 'gradient-8',
    component: Browser,
  },
  {
    id: 3,
    name: 'Visual Studio',
    icon: BiLogoVisualStudio,
    gradient: 'gradient-3',
    component: VSCode,
  },
  {
    id: 4,
    name: 'Docker',
    icon: BiLogoDocker,
    gradient: 'gradient-4',
    component: Docker,
  },
  {
    id: 5,
    name: 'PostgreSQL',
    icon: BiLogoPostgresql,
    gradient: 'gradient-9',
    component: Postgress,
  },
  {
    id: 6,
    name: 'MongoDB',
    icon: BiLogoMongodb,
    gradient: 'gradient-5',
    component: MongoDB,
  },
  {
    id: 6,
    name: 'Postman',
    icon: SiPostman,
    gradient: 'gradient-4',
    component: Postman,
  },
];
