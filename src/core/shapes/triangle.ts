import { Shape } from '../../core/decorators/shape.decorator';
import BasePolygon from '../../core/models/base-polygon';
import IPoint from '../../core/models/point.interface';
import { SPAWN_POINT } from '../editor-configuration';

@Shape({
  name: 'Triangle',
  description: 'A triangle is a polygon with three edges and three vertices.',
  icon: 'triangle',
  color: '#76b1e8'
})
class Triangle extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];

  constructor() {
    super();
    this.createVertices(SPAWN_POINT);
  }

  createVertices(position: IPoint): void {
    const size = 50;
    this.vertices = [
      { x: position.x + -size * 1.2, y: position.y + size },
      { x: position.x + size * 1.2, y: position.y + size },
      { x: position.x, y: position.y + -size }
    ];
  }
}

export default Triangle;
