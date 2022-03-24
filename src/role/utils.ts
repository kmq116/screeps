/**
 * role enum value
 */
export enum ROLE {
  harvester = "harvester",
  upgrader = "upgrader",
  builder = "builder",
  repairer = "repairer",
  carrier = "carrier"
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

/**
 * 生成 pixel
 *
 * @param cpuLimit 当 bucket 中的 cpu 到多少时才生成 pixel
 */
export function generatePixel(cpuLimit = 7000): void {
  if (Game.cpu.bucket >= cpuLimit) Game.cpu.generatePixel();
}

// export function creepFindStructures() {}
