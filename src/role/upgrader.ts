import { SOURCES } from "sources/sources";
import { isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";

export const roleUpgrader = {
  run(creep: Creep): void {
    // 身上携带的能量不足时，就去搬运能量
    if (shouldGetEnergy(creep)) {
      if (creep.harvest(SOURCES[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(SOURCES[1]);
      }

      //  能量满了 去升级控制器
      if (isEnergyFull(creep)) creep.memory.working = true;
    } else if (creep.room.controller && creep.memory.working === true) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
      if (isEnergyEmpty(creep)) creep.memory.working = false;
    }
  }
};
