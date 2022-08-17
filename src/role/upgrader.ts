import { MAIN_ROOM } from "sources/sources";
import { ROLE } from "./utils";

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
    const existEnergy = Game.rooms[MAIN_ROOM].energyAvailable;
    const energyCapacity = Game.rooms[MAIN_ROOM].energyCapacityAvailable;
    // 如果所有资源都被补满了，就直接从扩展容器里取能量
    if (existEnergy === energyCapacity) {
      const extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_EXTENSION
      });
      if (extension) creep.creepWithdraw(extension, RESOURCE_ENERGY);
    } else {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
      })[0];
      if (target) creep.creepWithdraw(target, RESOURCE_ENERGY);
    }
  }
});
