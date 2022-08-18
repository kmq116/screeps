/**
 * role enum value
 */
import { MAIN_ROOM } from "../sources/sources";

export enum ROLE {
  harvester = "harvester",
  upgrader = "upgrader",
  builder = "builder",
  repairer = "repairer",
  carrier = "carrier",
  explorerHarvester = "explorerHarvester",
  explorerCarrier = "explorerCarrier",
  reserveController = "reserveController"
}

/**
 * 生成 pixel
 *
 * @param cpuLimit 当 bucket 中的 cpu 到多少时才生成 pixel
 */
export function generatePixel(cpuLimit = 7000): void {
  if (Game.cpu.bucket >= cpuLimit) Game.cpu.generatePixel();
}

export const getRoleTotalNum = (roomId = MAIN_ROOM): Record<ROLE, number> => {
  return Memory.roomMemory[roomId].creepRoleCounts;
};
