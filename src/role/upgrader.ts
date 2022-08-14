import { ROLE } from "./utils";

export const roleUpgrader = {
  run(creep: Creep): void {
    // 身上携带的能量不足时，就去搬运能量
    if (creep.shouldGetEnergy()) {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
      })[0] as StructureContainer;
      // 如果没有找到可以取能量的地方，就转成收集者去挖矿
      if (!target) creep.memory.role = ROLE.harvester;
      if (target) creep.creepWithdraw(target, RESOURCE_ENERGY);
      if (creep.isEnergyFull()) creep.memory.working = true;
      //  能量满了 去升级控制器
      if (creep.isEnergyFull()) creep.memory.working = true;
    } else if (creep.room.controller && creep.memory.working === true) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
      if (creep.isEnergyEmpty()) creep.memory.working = false;
    }
  }
};
