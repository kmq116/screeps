import { MAIN_ROOM, SOURCES } from "sources/sources";
import { ROLE, findContainers, findStorages } from "./utils";

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
    // 如果所有资源都被补满了，就直接从扩展容器里取能量
    // if (existEnergy === energyCapacity) {
    //   const extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    //     filter: structure => structure.structureType === STRUCTURE_EXTENSION
    //   });
    //   if (extension) creep.creepWithdraw(extension, RESOURCE_ENERGY);
    // } else {
    const storages = findStorages(creep);
    if (storages[0]) creep.creepWithdraw(storages[0], RESOURCE_ENERGY);
    else {
      const container = findContainers(creep);
      if (container[0]) creep.creepWithdraw(container[0], RESOURCE_ENERGY);
    }
    // }
  }
});
