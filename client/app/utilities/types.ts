export type OpenWindow = {
  id: number;
  title: string;
  icon: JSX.Element; // Ensure this matches your actual expected type
  gradient: string;
  content: JSX.Element;
  zIndex: number;
  minimized: boolean;
};
