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
    const target = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
    })[0];
    // 如果没有找到可以取能量的地方，就转成收集者去挖矿
    if (target) creep.creepWithdraw(target, RESOURCE_ENERGY);
  }
});
