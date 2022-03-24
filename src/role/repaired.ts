import { SOURCES } from "sources/sources";
import { isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";

export const repaired = {
  run(creep: Creep): void {
    // 身上携带的能量不足时，就去搬运能量
    if (shouldGetEnergy(creep)) {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER
      })[0];
      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      // 能量满了就去升级
      if (isEnergyFull(creep)) creep.memory.working = true;
    } else if (creep.memory.working === true) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
      });

      targets.sort((a, b) => a.hits - b.hits);

      if (targets.length > 0) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      if (isEnergyEmpty(creep)) creep.memory.working = false;
    }
  }
};
