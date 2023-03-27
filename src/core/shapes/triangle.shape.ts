import { Shape } from '../decorators/shape.decorator';
import BasePolygon from '../models/base-polygon';
import IPoint from '../models/point.interface';
import { SHAPE_SIZE, SPAWN_POINT } from '../editor-configuration';

@Shape({
  name: 'Triangle',
  description: 'A triangle is a polygon with three edges and three vertices.',
  icon: 'triangle',
  color: '#76b1e8'
})
class Triangle extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];
  private readonly size = SHAPE_SIZE;

  constructor() {
    super();
    this.createVertices(SPAWN_POINT);
  }

  createVertices(position: IPoint): void {
    this.vertices = [
      { x: position.x + -this.size * 1.2, y: position.y + this.size },
      { x: position.x + this.size * 1.2, y: position.y + this.size },
      { x: position.x, y: position.y + -this.size }
    ];
  }
}

export default Triangle;
