import { roleUpgrader } from "./upgrader";

export const roleBuilder = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    if (creep.shouldGetEnergy()) {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER
      })[0];
      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      if (creep.isEnergyFull()) creep.memory.working = true;
    } else {
      if (creep.isEnergyEmpty()) creep.memory.working = false;
      if (creep.memory.working === true) {
        const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
          if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
          }
        } else {
          roleUpgrader.run(creep);
        }
      }
    }
  }
};
