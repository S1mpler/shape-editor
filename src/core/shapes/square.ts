import { Shape } from '../../core/decorators/shape.decorator';
import BasePolygon from '../../core/models/base-polygon';
import IPoint from '../../core/models/point.interface';

@Shape({
  name: 'Square',
  description: 'A square is a regular quadrilateral, which means that it has four equal sides and four equal angles (90-degree angles, or 100-gradian angles or right angles). It can also be defined as a rectangle in which two adjacent sides have equal length. A square with vertices ABCD would be denoted ABCD.',
  icon: 'square',
  color: '#76b1e8'
})
class Square extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];

  constructor() {
    super();
    this.createVertices({ x: 500, y: 400 });
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
