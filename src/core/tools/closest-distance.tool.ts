import BasePolygon from '../../core/models/base-polygon';
import BaseTool from '../../core/models/base-tool';
import IPoint from '../../core/models/point.interface';
import { Canvas } from '../../core/decorators/canvas.decorator';
import { OnClean } from '../../core/decorators/on-clean.decorator';
import { Tool } from '../../core/decorators/tool.decorator';
import { getCanvasMousePosition } from '../../core/utils/helpers/canvas-helper-functions';
import { isPointInPolygon } from '../../core/utils/helpers/geometry-helper-functions';
import { shapeStore } from '../../context/store.context';

@Tool({
  name: 'Closest distance',
  icon: 'closest-distance',
  description: 'Find the closest distance between cursor and shapes'
})
class ClosestDistanceTool extends BaseTool {
  private readonly shapeStore = shapeStore;

  @OnClean()
  public cleanState(): void {
    this.redrawShapes(this.shapeStore.getShapes());
  }

  @Canvas('mousemove')
  public handleClick(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    const shapes = this.shapeStore.getShapes().slice();
    this.redrawShapes(shapes);

    shapes.forEach((shape) => {
      const closestPoint = this.getClosestPoint(
        getCanvasMousePosition(event, this.canvas),
        shape
      );

      ctx.beginPath();
      ctx.arc(closestPoint.x, closestPoint.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#e63e25';
      ctx.fill();
      ctx.closePath();
    });
  }

  private getClosestPoint(mousePosition: IPoint, shape: BasePolygon): IPoint {
    if (isPointInPolygon(mousePosition, shape.vertices)) {
      return mousePosition;
    }

    let closestPoint: IPoint = { x: mousePosition.x, y: mousePosition.y };
    let minDistance = Infinity;

    for (let i = 0; i < shape.vertices.length; i++) {
      const pointA = shape.vertices[i];
      const pointB = shape.vertices[(i + 1) % shape.vertices.length];
      const currentClosestPoint = this.closestPointOnSegment(mousePosition, pointA, pointB);
      const currentDistance = this.squaredDistance(mousePosition, currentClosestPoint);

      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        closestPoint = currentClosestPoint;
      }
    }

    return closestPoint;
  }

  private squaredDistance(p1: IPoint, p2: IPoint): number {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return dx * dx + dy * dy;
  }

  private closestPointOnSegment(p: IPoint, a: IPoint, b: IPoint): IPoint {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);

    if (t < 0) return a;
    if (t > 1) return b;

    return { x: a.x + t * dx, y: a.y + t * dy };
  }
}

export default ClosestDistanceTool;
