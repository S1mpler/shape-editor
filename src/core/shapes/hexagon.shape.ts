import { Shape } from '../decorators/shape.decorator';
import BasePolygon from '../models/base-polygon';
import IPoint from '../models/point.interface';
import { SPAWN_POINT } from '../editor-configuration';

@Shape({
  name: 'Hexagon',
  description: 'A hexagon is a six-sided polygon or 6-gon. The total of all the angles in a hexagon is 720°.',
  icon: 'hexagon',
  color: '#76b1e8'
})
class Hexagon extends BasePolygon {
  vertices: IPoint[] = [] as IPoint[];

  constructor() {
    super();
    this.createVertices(SPAWN_POINT);
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
