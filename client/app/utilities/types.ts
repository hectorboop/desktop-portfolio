export type OpenWindow = {
  id: number;
  title: string;
  minimized: boolean;
  content: React.ReactNode;
  zIndex: number;
  icon: JSX.Element;
  gradient: string;
};
