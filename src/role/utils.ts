/**
 * role enum value
 */
export enum ROLE {
  harvester = "harvester",
  upgrader = "upgrader",
  builder = "builder",
  repairer = "repairer"
}

/**
 * 能量为空
 * @param creep
 */
export function isEnergyEmpty(creep: Creep): boolean {
  return creep.store[RESOURCE_ENERGY] === 0;
}

/**
 * 携带能量是否为满
 * @param creep
 */
export function isEnergyFull(creep: Creep): boolean {
  return creep.store.getFreeCapacity() === 0;
}

/**
 * 应该获取能量
 * @param creep
 */
export function shouldGetEnergy(creep: Creep): boolean {
  return creep.store.getFreeCapacity() >= 0 && creep.memory.working === false;
}
