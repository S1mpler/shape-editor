import BasePolygon from '../models/base-polygon';

interface SerializedShape {
  id: string
  name: string
  color: string
  vertices: number[][]
}

const serializeShapes = (shapes: BasePolygon[]): string => {
  const mappedShapes: SerializedShape[] = shapes.map((shape) => ({
    id: shape.id,
    name: shape.name,
    vertices: shape.vertices.map((vertex) => [vertex.x, vertex.y]),
    color: shape.color
  }));

  return JSON.stringify(mappedShapes);
};

export { serializeShapes };
