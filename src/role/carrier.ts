import { SOURCES } from "../sources/sources";
import { isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";

export const roleCarrier = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    if (shouldGetEnergy(creep)) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0;
        }
      });

      if (targets.length) {
        if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffaa00" } });
        }
      }
      // 能量满了就去升级
      if (isEnergyFull(creep)) creep.memory.working = true;
    } else if (creep.memory.working === true) {
      creep.say("📦");
      if (isEnergyEmpty(creep)) creep.memory.working = false;
      // 优先补满 spawn 和 extensions
      const spawnOrExtension = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      const containerTargets = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
      });
      const targets = spawnOrExtension.length ? spawnOrExtension : containerTargets;
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    }
  }
};
