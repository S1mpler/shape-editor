
import { PolygonDrawStrategy } from '../../core/utils/polygon-draw.strategy';
import { BaseShape } from './base-shape';
import IPoint from './point.interface';

abstract class BasePolygon extends BaseShape {
  abstract vertices: IPoint[];
  readonly strategy = new PolygonDrawStrategy();

  constructor() {
    super();
    this.strategy = new PolygonDrawStrategy();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.strategy.draw(ctx, this);
  }
}

export default BasePolygon;
