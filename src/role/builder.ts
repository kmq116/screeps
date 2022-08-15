import { roleUpgrader } from "./upgrader";

export const roleBuilder = {
  /** @param {Creep} creep **/
  run(creep: Creep): void {
    if (creep.shouldGetEnergy()) {
      if (creep.memory.sourceId) {
        const source = Game.getObjectById<StructureContainer>(creep.memory.sourceId);
        if (source) {
          if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
          }
          if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
            }
          }
        }
      } else {
        const target = creep.room.find(FIND_STRUCTURES, {
          filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
        })[0];
        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }

      if (creep.isEnergyFull()) creep.memory.working = true;
    } else {
      if (creep.isEnergyEmpty()) creep.memory.working = false;
      if (creep.memory.working === true) {
        const targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
          filter: s => s.structureType === STRUCTURE_ROAD
        });
        if (targets) {
          if (creep.build(targets) === ERR_NOT_IN_RANGE) {
            creep.moveTo(targets, { visualizePathStyle: { stroke: "#ffffff" } });
          }
        } else {
          roleUpgrader.run(creep);
        }
      }
    }
  }
};
