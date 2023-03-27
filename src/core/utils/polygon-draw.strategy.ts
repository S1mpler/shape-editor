import BasePolygon from '../../core/models/base-polygon';
import { IDrawStrategy } from './draw-strategy.interface';

class PolygonDrawStrategy implements IDrawStrategy<BasePolygon> {
  draw(ctx: CanvasRenderingContext2D, polygon: BasePolygon): void {
    ctx.beginPath();
    ctx.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

    for (let i = 1; i < polygon.vertices.length; i++) {
      ctx.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = polygon.color;
    ctx.fill();
  }
}

export { PolygonDrawStrategy };
