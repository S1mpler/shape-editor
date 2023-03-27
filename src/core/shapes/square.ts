import { Shape } from '../../core/decorators/shape.decorator';
import BasePolygon from '../../core/models/base-polygon';
import IPoint from '../../core/models/point.interface';
import { SPAWN_POINT } from '../editor-configuration';

@Shape({
  name: 'Square',
  description: 'A square is a regular quadrilateral. It can also be defined as a rectangle in which two adjacent sides have equal length.',
  icon: 'square',
  color: '#76b1e8'
})
class Square extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];

  constructor() {
    super();
    this.createVertices(SPAWN_POINT);
  }

  createVertices(position: IPoint): void {
    const size = 50;
    this.vertices = [
      { x: position.x + -size, y: position.y + -size },
      { x: position.x + size, y: position.y + -size },
      { x: position.x + size, y: position.y + size },
      { x: position.x + -size, y: position.y + size }
    ];
  }
}

export default Square;
