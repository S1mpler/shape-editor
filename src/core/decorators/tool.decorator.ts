/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import BaseTool from '../../core/models/base-tool';
import ITool from '../../core/models/tool.interface';

function Tool(options: ITool) {
  return function <T extends new (...args: any[]) => BaseTool>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(args[0], options.name, options.icon, options.description);
      }
    };
  };
}

export { Tool };
