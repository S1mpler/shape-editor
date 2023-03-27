/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseTool from '../models/base-tool';
import 'reflect-metadata';

function Canvas(eventName: keyof HTMLElementEventMap) {
  return function (
    target: BaseTool,
    propertyKey: string | symbol,
    _descriptor: TypedPropertyDescriptor<any>
  ) {
    Reflect.defineMetadata('event', eventName, target, propertyKey);
  };
}

export { Canvas };
