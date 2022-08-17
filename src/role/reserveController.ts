import { RIGHT_ROOM } from "sources/sources";

export const reserveController = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    const controller = Game.rooms[RIGHT_ROOM].controller;
    if (controller) {
      if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
        creep.reserveController(controller);
      }
    }
  },
  source(creep: Creep) {
    const controller = Game.rooms[RIGHT_ROOM].controller;
    if (controller) {
      if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
        creep.reserveController(controller);
      }
    }
  }
});
