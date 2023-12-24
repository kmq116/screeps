import { findContainers, findSpawns, findStorages } from "./utils";

export const upgrader = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    if (creep.room.controller && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller);
    }
  },
  source(creep: Creep) {
    const storages = findStorages(creep);
    const spawn = creep._findSpawns();
    if (spawn[0]) {
      creep.creepWithdraw(spawn[0], RESOURCE_ENERGY);
    } else if (storages[0]) creep.creepWithdraw(storages[0], RESOURCE_ENERGY);
    else {
      const container = findContainers(creep);
      if (container[0]) creep.creepWithdraw(container[0], RESOURCE_ENERGY);
    }
    // }
  }
});
