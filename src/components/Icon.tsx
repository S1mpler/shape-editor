import { ShapeIconType, ToolIconType } from '../core/models/icon.type';

interface IProps {
  name: ToolIconType | ShapeIconType | null
}
const Icon: React.FC<IProps> = ({ name }: IProps) => {
  // Tools
  if (name === 'selection') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 14.655l-5.799.908 3.393 6.917-3.111 1.52-3.413-6.982-4.07 3.651v-15.857l13 9.843zm-15-6.212c-1.19-.693-2-1.969-2-3.443 0-2.206 1.794-4 4-4 2.235 0 4.164 1.875 3.969 4.309l.928.703c.637-3.087-1.715-6.012-4.897-6.012-2.761 0-5 2.239-5 5 0 2.049 1.236 3.806 3 4.578v-1.135z" /></svg>
    );
  }

  if (name === 'move') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm-3.857 3c-.084-.321-.143-.652-.143-1s.059-.679.143-1h-2.143v-4l-6 5 6 5v-4h2.143zm7.714-2c.084.321.143.652.143 1s-.059.679-.143 1h2.143v4l6-5-6-5v4h-2.143zm-2.857 4.857c-.321.084-.652.143-1 .143s-.679-.059-1-.143v2.143h-4l5 6 5-6h-4v-2.143zm-2-7.714c.321-.084.652-.143 1-.143s.679.059 1 .143v-2.143h4l-5-6-5 6h4v2.143z" /></svg>
    );
  }

  if (name === 'closest-distance') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 11v-4l-6 5 6 5v-4h12v4l6-5-6-5v4z" /></svg>
    );
  }

  // Shapes
  if (name === 'triangle') {
    return (
      <svg width={24} height={24} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm1.935-.384h15.939l-7.97-14.22z" fillRule="nonzero" /></svg>
    );
  }

  if (name === 'square') {
    return (
      <svg width={24} height={24} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 4c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15z" fillRule="nonzero" /></svg>
    );
  }

  if (name === 'hexagon') {
    return (
      <svg width={24} height={24} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.476 3c.369 0 .709.197.887.514.9 1.595 3.633 6.445 4.509 8.001.075.131.118.276.126.423.012.187-.029.377-.126.547-.876 1.556-3.609 6.406-4.509 8-.178.318-.518.515-.887.515h-8.951c-.369 0-.709-.197-.887-.515-.899-1.594-3.634-6.444-4.51-8-.085-.151-.128-.318-.128-.485s.043-.334.128-.485c.876-1.556 3.611-6.406 4.51-8.001.178-.317.518-.514.887-.514zm-8.672 1.5-4.228 7.5 4.228 7.5h8.393l4.227-7.5-4.227-7.5z" /></svg>
    );
  }

  return null;
};
export default Icon;
