import { creepWithdraw, isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";

export const roleUpgrader = {
  run(creep: Creep): void {
    // 身上携带的能量不足时，就去搬运能量
    if (creep.shouldGetEnergy()) {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
      })[0];
      if (target) creepWithdraw(creep, target, RESOURCE_ENERGY);
      if (creep.isEnergyFull()) creep.memory.working = true;
      //  能量满了 去升级控制器
      if (creep.isEnergyFull()) creep.memory.working = true;
    } else if (creep.room.controller && creep.memory.working === true) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
      if (isEnergyEmpty(creep)) creep.memory.working = false;
    }
  }
};
