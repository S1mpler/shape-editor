import { Shape } from '../decorators/shape.decorator';
import BasePolygon from '../models/base-polygon';
import IPoint from '../models/point.interface';
import { SHAPE_SIZE, SPAWN_POINT } from '../editor-configuration';

@Shape({
  name: 'Square',
  description: 'A square is a regular quadrilateral. It can also be defined as a rectangle in which two adjacent sides have equal length.',
  icon: 'square',
  color: '#76b1e8'
})
class Square extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];
  private readonly size = SHAPE_SIZE;

  constructor() {
    super();
    this.createVertices(SPAWN_POINT);
  }

  createVertices(position: IPoint): void {
    this.vertices = [
      { x: position.x + -this.size, y: position.y + -this.size },
      { x: position.x + this.size, y: position.y + -this.size },
      { x: position.x + this.size, y: position.y + this.size },
      { x: position.x + -this.size, y: position.y + this.size }
    ];
  }
}

export default Square;
