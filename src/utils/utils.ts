/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const assignPrototype = (obj1: Record<string, any>, obj2: Record<string, any>): void => {
  Object.getOwnPropertyNames(obj2.prototype).forEach(key => {
    obj1.prototype[key] = obj2.prototype[key];
  });
};
