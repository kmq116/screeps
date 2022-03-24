import { roleBuilder } from "./builder";
import { SOURCES } from "../sources/sources";
import { isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";
import { repaired } from "./repaired";

export const roleHarvester = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    if (shouldGetEnergy(creep)) {
      if (creep.harvest(SOURCES[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(SOURCES[0]);
      }
      // 能量满了就去升级
      if (isEnergyFull(creep)) creep.memory.working = true;
    } else if (creep.memory.working === true) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
      if (isEnergyEmpty(creep)) creep.memory.working = false;
    } else {
      repaired.run(creep);
    }
  }
};
