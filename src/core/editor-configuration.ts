import IPoint from './models/point.interface';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = CANVAS_WIDTH * (window.innerHeight / window.innerWidth);

const SPAWN_POINT: IPoint = {
  x: CANVAS_WIDTH / 2,
  y: CANVAS_HEIGHT / 2
};

const SHAPE_SIZE = 50;

export { CANVAS_WIDTH, CANVAS_HEIGHT, SPAWN_POINT, SHAPE_SIZE };
