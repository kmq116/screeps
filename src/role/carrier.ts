// import { SOURCES } from "../sources/sources";
// import { isEnergyEmpty, isEnergyFull, shouldGetEnergy } from "./utils";
// import { repaired } from "./repaired";
//
// export const roleHarvester = {
//   /** @param {Creep} creep **/
//   run(creep: Creep): void {
//     if (shouldGetEnergy(creep)) {
//       if (creep.harvest(SOURCES[0]) === ERR_NOT_IN_RANGE) {
//         creep.moveTo(SOURCES[0]);
//       }
//       // 能量满了就去升级
//       if (isEnergyFull(creep)) creep.memory.working = true;
//     } else if (creep.memory.working === true && Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) {
//       if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//         creep.moveTo(Game.spawns.Spawn1);
//       }
//       if (isEnergyEmpty(creep)) creep.memory.working = false;
//     } else {
//       repaired.run(creep);
//     }
//   }
// };
export const a = 1;
