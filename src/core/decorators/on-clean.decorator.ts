/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import 'reflect-metadata';

function OnClean() {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('onClean', propertyKey, target);
  };
}

export { OnClean };
