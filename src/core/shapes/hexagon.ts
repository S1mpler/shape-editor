import { Shape } from '../../core/decorators/shape.decorator';
import BasePolygon from '../../core/models/base-polygon';
import IPoint from '../../core/models/point.interface';

@Shape({
  name: 'Hexagon',
  description: 'A hexagon is a six-sided polygon or 6-gon. The total of all the angles in a hexagon is 720°. A regular hexagon has all sides the same length and all angles the same size. A regular hexagon is also a regular polygon and is both equiangular and equilateral.',
  icon: 'hexagon',
  color: '#76b1e8'
})
class Hexagon extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];

  constructor() {
    super();
    this.createVertices({ x: 500, y: 400 });
  }

  createVertices(position: IPoint): void {
    const addaptiveSize = 50;
    this.vertices = [
      { x: position.x + -addaptiveSize / 1.7, y: position.y + -addaptiveSize },
      { x: position.x + addaptiveSize / 1.7, y: position.y + -addaptiveSize },
      { x: position.x + addaptiveSize * 1.2, y: position.y },
      { x: position.x + addaptiveSize / 1.7, y: position.y + addaptiveSize },
      { x: position.x + -addaptiveSize / 1.7, y: position.y + addaptiveSize },
      { x: position.x + -addaptiveSize * 1.2, y: position.y }
    ];
  }
}

export default Hexagon;
