import { SOURCES, SPAWN1 } from "../sources/sources";
import { roleUpgrader } from "./upgrader";
import { isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";

export const roleBuilder = {
  /** @param {Creep} creep **/
  run(creep: Creep) {
    if (shouldGetEnergy(creep)) {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER
      })[0];
      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      if (isEnergyFull(creep)) creep.memory.working = true;
    } else {
      if (isEnergyEmpty(creep)) creep.memory.working = false;
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
