import IPoint from '../../models/point.interface';

export function getCanvasMousePosition(
  event: MouseEvent,
  canvas: HTMLCanvasElement
): IPoint {
  const eventPoint: IPoint = {
    x: event.clientX,
    y: event.clientY
  };
  const { width: totalWidth, height: totalHeight } = canvas.getBoundingClientRect();
  const { width: canvasWidth, height: canvasHeight } = canvas;

  return convertClientToCanvasCoords(eventPoint, totalWidth, totalHeight, canvasWidth, canvasHeight);
}

function convertClientToCanvasCoords(
  point: IPoint,
  totalWidth: number,
  totalHeight: number,
  resolutionWidth: number,
  resolutionHeight: number
): IPoint {
  const scaleX = resolutionWidth / totalWidth;
  const scaleY = resolutionHeight / totalHeight;

  const x = (point.x) * scaleX;
  const y = (point.y) * scaleY;

  return { x, y };
}
