/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BaseShape } from '../../core/models/base-shape';
import { IShapeOptions } from '../../core/models/shape-options.interface';

const applyProps = <T extends BaseShape>(instance: T, options: IShapeOptions): T => {
  instance.name = options.name;
  instance.icon = options.icon;
  instance.description = options.description;
  instance.color = options.color;
  return instance;
};

function Shape(options: IShapeOptions) {
  return function <T extends new (...args: any[]) => BaseShape>(constructor: T): T {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        applyProps(this, options);
      }
    };
  };
}

export { Shape };
